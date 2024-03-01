import {
  Component,
  OnDestroy,
  OnInit,
  inject,
  input,
  signal,
} from '@angular/core';
import {
  ExtraData,
  Field,
  FieldConfig,
  ViewComponentConfig,
} from './view.component.interface';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';
import { LoadingService } from '../../services/loading.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { ViewDeleteDialogComponent } from './view-delete-dialog/view-delete-dialog.component';
import { DialogData } from './view-delete-dialog/view-delete-dialog.interface';
import { DateService } from '../../services/date.service';
import { QuranMemorizeComponent } from './quran-memorize/quran-memorize.component';
import { QuranTestComponent } from './quran-test/quran-test.component';
import { QuranAwqafTestComponent } from './quran-awqaf-test/quran-awqaf-test.component';


@Component({
  selector: 'app-view',
  standalone: true,
  imports: [
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatSelectModule,
    ReactiveFormsModule,
    QuranMemorizeComponent,
    QuranTestComponent,
    QuranAwqafTestComponent,
    RouterLink,
    TranslatePipe,
  ],
  providers: [
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'ar',
    },
    provideNativeDateAdapter(),
  ],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss',
})
export class ViewComponent<T, U> implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private snackbar = inject(SnackbarService);
  private fb = inject(FormBuilder);
  private dialog = inject(MatDialog);
  private date = inject(DateService);
  public loading = inject(LoadingService).loading;

  private destroyed$ = new Subject<void>();
  public viewId!: string;
  public fields = signal<Field[]>([]);
  public extraData: ExtraData = {};
  public editMode = signal(false);
  public form = this.fb.nonNullable.group({});

  public _config = input.required<ViewComponentConfig<T, U>>({
    alias: 'config',
  });

  get config() {
    return this._config();
  }

  ngOnInit(): void {
    this.loading.set(true);

    const routeId = this.route.snapshot.paramMap.get('id');

    if (routeId === null) {
      this.snackbar.open('يجب تواجد المعرف في الرابط');
      this.router.navigateByUrl('/');

      this.loading.set(false);
      return;
    }

    this.viewId = routeId;
    this.config
      .viewFunc(routeId)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((res) => {
        this.loading.set(false);
        this.fields.set(
          Object.entries<any>(res as { [key: string]: any }).filter(([name]) => name !== 'id').map(
            ([name, value]) => {
              const fieldsInfo = (this.config.fieldsInfo as any)[name] as
                | FieldConfig
                | undefined;

              if (!fieldsInfo?.nonEditable) {
                if (fieldsInfo?.type === 'relation') {
                  // here we convert the null value to -1 to display its label in the select input
                  this.form.addControl(name, this.fb.control(value ?? -1, [...(fieldsInfo?.validators ?? [])]));
                } else {
                  this.form.addControl(name, this.fb.control(value, [...(fieldsInfo?.validators ?? [])]));
                }
              }

              if (fieldsInfo?.type === 'relation') {
                const map = new Map<number, string>();
                const data = signal<{ id: number; name: string }[]>([]);

                fieldsInfo
                  .getFieldValueFunc()
                  .pipe(takeUntil(this.destroyed$))
                  .subscribe((res) => {
                    data.set(res)

                    res.forEach((item) => {
                      map.set(item.id, item.name);
                    });

                  });

                this.extraData[name] = {
                  map,
                  data,
                  getUrlFunc: fieldsInfo.getUrlFunc,
                };
              }

              if (fieldsInfo?.type === 'relation') {
                return {
                  name,
                  value,
                  type: 'relation',
                  relationType: fieldsInfo.relationType,
                  nonEditable: fieldsInfo?.nonEditable,
                }
              }

              return {
                name,
                value,
                type: fieldsInfo?.type ?? 'string',
                nonEditable: fieldsInfo?.nonEditable,
              };
            }
          )
        );
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  toggleMode() {
    if (this.config.updateFunc !== undefined) {
      this.editMode.update(pre => !pre);
    }
  }

  submitUpdate() {
    const value: any = this.form.value;

    // here we returning the -1 values in the relation field type to null
    // before sending it to the server
    this.fields().forEach(field => {
      if (field.type === 'relation') {
        value[field.name] = value[field.name] === -1 ? null : value[field.name]
      } else if (value[field.name] instanceof Date && (field.type === 'date' || field.type === 'datetime')) {
        value[field.name] = this.date.format(value[field.name])
      }
    });

    const currentUpdateFunc = this.config.updateFunc;
    if (this.form.valid && currentUpdateFunc !== undefined && !this.loading()) {
      this.loading.set(true);

      currentUpdateFunc(this.viewId, this.form.value as U).subscribe(() => {
        this.snackbar.open('تم التعديل بنجاح');
        this.loading.set(false);
        this.router.navigateByUrl(`/${this.config.groupName}/${this.config.itemNameAndRouteName}`);
      });
    }
  }

  deleteFunction() {
    const currentDeleteFunc = this.config.deleteFunc;

    if (currentDeleteFunc !== undefined) {
      this.dialog.open<ViewDeleteDialogComponent, DialogData>(ViewDeleteDialogComponent, {
        autoFocus: false,
        width: '400px',
        data: {
          deleteFunc: () => {
            return currentDeleteFunc(this.viewId);
          },
          groupName: this.config.groupName,
          itemNameAndRouteName: this.config.itemNameAndRouteName,
        }
      })
    }
  }
}
