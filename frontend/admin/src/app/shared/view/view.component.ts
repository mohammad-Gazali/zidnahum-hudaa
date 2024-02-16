import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  inject,
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
import { JsonPipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

// TODO: handle nonEditable attribute

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
    RouterLink,
    TranslatePipe,
    // TODO: remove
    JsonPipe,
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
export class ViewComponent<T> implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private snackbar = inject(SnackbarService);
  private fb = inject(FormBuilder);
  public loading = inject(LoadingService).loading;

  private destroyed$ = new Subject<void>();
  public viewId!: string;
  public fields = signal<Field[]>([]);
  public extraData: ExtraData = {};
  public editMode = signal(false);
  public form = this.fb.nonNullable.group({});

  @Input({ required: true }) public config!: ViewComponentConfig<T>;

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
          Object.entries<any>(res as { [key: string]: any }).map(
            ([name, value]) => {
              const fieldsInfo = (this.config.fieldsInfo as any)[name] as
                | FieldConfig
                | undefined;

              this.form.addControl(name, this.fb.control(value, [...(fieldsInfo?.validators ?? [])]));

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

              return {
                name,
                value,
                type: fieldsInfo?.type ?? 'string',
                nullable: fieldsInfo?.type === 'relation' && fieldsInfo.nullable,
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
    if (this.config.editable) {
      this.editMode.update(pre => !pre);
    }
  }
}
