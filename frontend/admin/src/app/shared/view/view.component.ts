import {
  Component,
  DestroyRef,
  OnInit,
  inject,
  input,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { ViewDeleteDialogComponent } from './view-delete-dialog/view-delete-dialog.component';
import { DialogData } from './view-delete-dialog/view-delete-dialog.interface';
import { QuranMemorizeComponent } from './quran-memorize/quran-memorize.component';
import { QuranTestComponent } from './quran-test/quran-test.component';
import { QuranAwqafTestComponent } from './quran-awqaf-test/quran-awqaf-test.component';
import { QuranEliteTestComponent } from './quran-elite-test/quran-elite-test.component';
import { SnackbarService } from '../../services/snackbar.service';
import { LoadingService } from '../../services/loading.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { DateService } from '../../services/date.service';
import { MemoItemType } from '../../services/quran/quran.constatns';
import {
  ExtraData,
  Field,
  FieldConfig,
  ViewComponentConfig,
} from './view.component.interface';
import { ChangesFieldComponent } from '../changes-field/changes-field.component';

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
    MatExpansionModule,
    ReactiveFormsModule,
    QuranMemorizeComponent,
    QuranTestComponent,
    QuranEliteTestComponent,
    QuranAwqafTestComponent,
    RouterLink,
    TranslatePipe,
    ChangesFieldComponent,
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
export class ViewComponent<T, U> implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private snackbar = inject(SnackbarService);
  private fb = inject(FormBuilder);
  private dialog = inject(MatDialog);
  private destroyRef = inject(DestroyRef);
  public date = inject(DateService);
  public loading = inject(LoadingService).loading;

  public fields = signal<Field[]>([]);
  public editMode = signal(false);
  public extraData = signal<ExtraData>({});
  public form = this.fb.nonNullable.group({});
  public viewId!: string;

  public config = input.required<ViewComponentConfig<T, U>>();

  ngOnInit(): void {
    this.loading.set(true);

    const routeId = this.route.snapshot.paramMap.get('id');

    if (routeId === null) {
      this.snackbar.error('يجب تواجد المعرف في الرابط');
      this.router.navigateByUrl('/');

      this.loading.set(false);
      return;
    }

    this.viewId = routeId;
    this.config()
      .viewFunc(routeId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.loading.set(false);
        this.fields.set(
          Object.entries<any>(res as { [key: string]: any })
            .filter(([name]) => name !== 'id')
            .map(([name, value]) => {
              const fieldsInfo = (this.config().fieldsInfo as any)[name] as
                | FieldConfig
                | undefined;

              if (!fieldsInfo?.nonEditable) {
                if (fieldsInfo?.type === 'relation') {
                  // here we convert the null value to -1 to display its label in the select input
                  this.form.addControl(
                    name,
                    this.fb.control(value ?? -1, [
                      ...(fieldsInfo?.validators ?? []),
                    ])
                  );
                } else if (
                  fieldsInfo?.type === 'q_memorize' ||
                  fieldsInfo?.type === 'q_test' ||
                  fieldsInfo?.type === 'q_test_awqaf' ||
                  fieldsInfo?.type === 'q_elite_test'
                ) {
                  this.form.addControl(
                    name,
                    this.fb.array(
                      (value as MemoItemType[]).map((item) =>
                        this.fb.nonNullable.control(item)
                      )
                    )
                  );
                } else {
                  this.form.addControl(
                    name,
                    this.fb.control(value, [...(fieldsInfo?.validators ?? [])])
                  );
                }
              }

              if (fieldsInfo?.type === 'relation') {
                const map = new Map<number, string>();
                const data = signal<{ id: number; name: string }[]>([]);

                fieldsInfo
                  .getFieldValueFunc()
                  .pipe(takeUntilDestroyed(this.destroyRef))
                  .subscribe((res) => {
                    data.set(res);

                    res.forEach((item) => {
                      map.set(item.id, item.name);
                    });
                  });

                this.extraData.update((pre) => {
                  return {
                    ...pre,
                    [name]: {
                      map,
                      data,
                      getUrlFunc: fieldsInfo.getUrlFunc,
                    },
                  };
                });
              }

              if (fieldsInfo?.type === 'relation') {
                return {
                  name,
                  value,
                  type: 'relation',
                  relationType: fieldsInfo.relationType,
                  nonEditable: fieldsInfo?.nonEditable,
                };
              }

              if (fieldsInfo?.type === 'link') {
                return {
                  name,
                  type: 'link',
                  nonEditable: fieldsInfo?.nonEditable,
                  stringFieldValue: (res as any)[fieldsInfo.stringField],
                  url: fieldsInfo.getUrlFunc(value),
                };
              }

              return {
                name,
                value,
                type: fieldsInfo?.type ?? 'string',
                nonEditable: fieldsInfo?.nonEditable,
              };
            })
        );
      });
  }

  toggleMode() {
    if (this.config().updateFunc !== undefined) {
      this.editMode.update((pre) => !pre);
    }
  }

  submitUpdate() {
    const value: any = this.form.value;

    // here we returning the -1 values in the relation field type to null
    // before sending it to the server
    this.fields().forEach((field) => {
      if (field.type === 'relation') {
        value[field.name] = value[field.name] === -1 ? null : value[field.name];
      } else if (
        value[field.name] instanceof Date &&
        (field.type === 'date' || field.type === 'datetime')
      ) {
        value[field.name] = this.date.format(value[field.name], 'yyyy-MM-dd');
      }
    });

    const currentUpdateFunc = this.config().updateFunc;
    if (this.form.valid && currentUpdateFunc !== undefined && !this.loading()) {
      this.loading.set(true);

      currentUpdateFunc(this.viewId, this.form.value as U).subscribe(() => {
        this.snackbar.success('تم التعديل بنجاح');
        this.loading.set(false);
        this.router.navigateByUrl(
          `/${this.config().groupName}/${this.config().itemNameAndRouteName}`
        );
      });
    }
  }

  deleteFunction() {
    const currentDeleteFunc = this.config().deleteFunc;

    if (currentDeleteFunc !== undefined) {
      this.dialog.open<ViewDeleteDialogComponent, DialogData>(
        ViewDeleteDialogComponent,
        {
          autoFocus: false,
          width: '400px',
          data: {
            deleteFunc: () => {
              return currentDeleteFunc(this.viewId);
            },
            groupName: this.config().groupName,
            itemNameAndRouteName: this.config().itemNameAndRouteName,
          },
        }
      );
    }
  }

  // memorize message specific
  findMessageType() {
    const messageType = this.fields().find(f => f.name === 'message_type')
    return messageType?.type === 'relation' && messageType.value;
  }
}
