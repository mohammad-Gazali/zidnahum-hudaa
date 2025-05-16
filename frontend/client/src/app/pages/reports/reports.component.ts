import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { finalize } from 'rxjs';
import { ReportsService, MasjedService, LayoutService, MasjedPipe, ReportsStudentCategoryOrGroupStudent, ReportsStudentCategoryOrGroupResponse } from '@shared';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatRadioModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    MatTableModule,
    MatDividerModule,
    DatePipe,
    MasjedPipe
],
  providers: [
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'ar',
    },
    provideNativeDateAdapter(),
  ],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
})
export class ReportsComponent {
  private fb = inject(NonNullableFormBuilder);
  private reports = inject(ReportsService);
  private destroyRef = inject(DestroyRef);
  public masjed = inject(MasjedService);
  public loading = inject(LayoutService).loading;

  public masjeds = this.masjed.masjedOptions;

  public form = this.fb.group({
    masjed: this.fb.control<1 | 2 | 3 | undefined>(undefined, [Validators.required]),
    start_date: this.fb.control<Date | undefined>(undefined, [
      Validators.required,
    ]),
    end_date: this.fb.control<Date | undefined>(undefined, [
      Validators.required,
    ]),
  });

  public allResponse = signal<ReportsAllResponseItem[] | null>(null);
  public allStudentsResponse = signal<ReportsStudentCategoryOrGroupStudent[] | null>(null)
  public type = this.fb.control<
    'all-students' | 'all-categories' | 'all-groups'
  >('all-students');
  public changesColumnHidden = signal(true);

  private allStudentsSubmit(excel?: boolean): void {
    const data = {
      ...this.getDurationData(),
      masjed: this.form.value.masjed!,
    };

    if (excel) {
      this.reports
        .reportsStudentsAllCreate({
          data,
          excel: true,
        })
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          finalize(() => this.loading.set(false))
        )
        .subscribe((res) => this.downloadBlob(res as any));
    } else {
      this.reports
        .reportsStudentsAllCreate({
          data,
          excel: false,
        })
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          finalize(() => this.loading.set(false))
        )
        .subscribe((res) => {
          this.allStudentsResponse.set(res);
        });
    }
  }


  private submitAllCategories(excel?: boolean) {
    const data = {
      ...this.getDurationData(),
      masjed: this.form.value.masjed!,
    };

    if (excel) {
      this.reports
        .reportsCategoryAllCreate({
          data,
          excel: true,
        })
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          finalize(() => this.loading.set(false))
        )
        .subscribe((res) => this.downloadBlob(res as any));
    } else {
      this.reports
        .reportsCategoryAllCreate({
          data,
          excel: false,
        })
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          finalize(() => this.loading.set(false))
        )
        .subscribe((res) => {
          this.allResponse.set(
            res.map((item) => ({
              ...item,
              id: item.category_id,
              name: item.category_name,
            }))
          );
        });
    }
  }

  private submitAllGroups(excel?: boolean) {
    const data = {
      ...this.getDurationData(),
      masjed: this.form.value.masjed!,
    };

    if (excel) {
      this.reports
        .reportsGroupAllCreate({
          data,
          excel: true,
        })
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          finalize(() => this.loading.set(false))
        )
        .subscribe((res) => this.downloadBlob(res as any));
    } else {
      this.reports
        .reportsGroupAllCreate({
          data,
          excel: false,
        })
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          finalize(() => this.loading.set(false))
        )
        .subscribe((res) => {
          this.allResponse.set(
            res.map((item) => ({
              ...item,
              id: item.group_id,
              name: item.group_name,
            }))
          );
        });
    }
  }

  submit(excel?: boolean) {
    if (!this.form.valid || this.loading()) return;

    this.loading.set(true);

    if (this.type.value === 'all-students') {
      this.allStudentsSubmit(excel);
    } else if (this.type.value === 'all-categories') {
      this.submitAllCategories(excel);
    } else if (this.type.value === 'all-groups') {
      this.submitAllGroups(excel);
    }
  }

  private getDurationData() {
    return {
      start_date: this.dateToISO(this.form.value.start_date!),
      end_date: this.dateToISO(this.form.value.end_date!),
    };
  }

  private downloadBlob(blob: Blob): void {
    const downloadLink = document.createElement('a');
    downloadLink.style.display = 'none';
    downloadLink.href = window.URL.createObjectURL(new Blob([blob]));
    downloadLink.download = 'report.xlsx';
    document.body.append(downloadLink);
    downloadLink.click();
  }

  private dateToISO(value: Date) {
    const timezoneOffset = value.getTimezoneOffset() * 60000;
    return new Date(value.getTime() - timezoneOffset).toISOString();  
  }
}

interface ReportsAllResponseItem extends ReportsStudentCategoryOrGroupResponse {
  id: number;
  name: string;
}
