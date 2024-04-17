import { Component, DestroyRef, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { finalize } from 'rxjs';
import { ExtraService } from '../../../../services/api/admin/services';
import { LOADING } from '../../../../tokens/loading.token';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { StatisticsResponse } from '../../../../services/api/admin/models';
import { TranslatePipe } from '../../../../pipes/translate.pipe';
import { MasjedService } from '../../../../services/masjed.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule,
    DatePipe,
    TranslatePipe,
  ],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss',
  providers: [
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'ar',
    },
    provideNativeDateAdapter(),
  ],
})
export class StatisticsComponent {
  private extra = inject(ExtraService);
  private fb = inject(NonNullableFormBuilder);
  private destroyRef = inject(DestroyRef);
  public loading = inject(LOADING);
  public getMasjed = inject(MasjedService).getMasjed;

  public response = signal<StatisticsResponse | null>(null);

  public form = this.fb.group({
    start_date: this.fb.control<Date | undefined>(undefined),
    end_date: this.fb.control<Date | undefined>(undefined),
    memo: this.fb.control(true),
    test: this.fb.control(true),
    awqaf_test: this.fb.control(true),
    awqaf_test_looking: this.fb.control(true),
    awqaf_test_explaining: this.fb.control(true),
    active_students: this.fb.control(true),
  });

  public submit() {
    if (!this.form.valid || this.loading()) return;

    this.loading.set(true);

    const value = this.form.value;

    if (!value.start_date) {
      delete value.start_date;
    }
    if (!value.end_date) {
      delete value.end_date;
    }

    this.extra
      .extraStatisticsCreate({
        ...value,
        start_date: value.start_date as any,
        end_date: value.end_date as any,
      })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.loading.set(false))
      )
      .subscribe(this.response.set);
  }

  public responseToArray(response: StatisticsResponse) {
    return Object.entries(response).filter(
      ([, value]) => value !== undefined && value !== null
    ).map(([name, value]) => ({
      name,
      value: value as number[],
    }));
  }
}
