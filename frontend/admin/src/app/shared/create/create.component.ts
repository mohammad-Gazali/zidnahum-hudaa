import {
  Component,
  DestroyRef,
  OnInit,
  inject,
  input,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { Router } from '@angular/router';
import { LoadingService } from '../../services/loading.service';
import { DateService } from '../../services/date.service';
import { SnackbarService } from '../../services/snackbar.service';
import {
  CreateComponentConfig,
  Field,
  FieldConfig,
} from './create.component.interface';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatSelectModule,
    TranslatePipe,
  ],
  providers: [
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'ar',
    },
    provideNativeDateAdapter(),
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent<T> implements OnInit {
  private fb = inject(FormBuilder);
  private date = inject(DateService);
  private snackbar = inject(SnackbarService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  public loading = inject(LoadingService).loading;

  public form = this.fb.nonNullable.group({});
  public fields = signal<Field[]>([]);

  public config = input.required<CreateComponentConfig<T>>();

  ngOnInit(): void {
    Object.entries<FieldConfig>(this.config().fields).forEach(
      ([name, config]) => {
        const validators = config.validators ?? [];

        if (config.type === 'boolean') {
          this.form.addControl(name, this.fb.control(false, validators));
        } else if (
          config.type === 'relation' &&
          config.relationType === 'multiple'
        ) {
          this.form.addControl(name, this.fb.control([], validators));
        } else {
          this.form.addControl(name, this.fb.control(undefined, validators));
        }

        this.fields.update((pre) => [
          ...pre,
          {
            name,
            config,
            options: [],
          },
        ]);

        if (config.type === 'relation') {
          config
            .getFieldValueFunc()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((res) => {
              this.fields.update((fields) => {
                return fields.map((f) => {
                  if (f.name === name) {
                    return {
                      ...f,
                      options: res,
                    };
                  }

                  return f;
                });
              });
            });
        }
      }
    );
  }

  submit() {
    const value: any = this.form.value;

    this.fields().forEach((f) => {
      if (
        f.config.type === 'relation' &&
        f.config.relationType === 'nullable' &&
        value[f.name] === -1
      ) {
        value[f.name] = null;
      } else if (f.config.type === 'date' && value[f.name] instanceof Date) {
        value[f.name] = this.date.format(value[f.name], 'yyyy-MM-dd');
      }
    });

    if (this.form.valid && !this.loading()) {
      this.loading.set(true);
      this.config()
        .createFunc(value)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.snackbar.success('تمت الإضافة بنجاح');
          this.loading.set(false);
          this.goToTable();
        });
    }
  }

  goToTable() {
    this.router.navigateByUrl(this.config().tableRoute);
  }
}
