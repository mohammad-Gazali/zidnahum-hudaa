import { Component, EventEmitter, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { TranslatePipe } from '../../../pipes/translate.pipe';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DateService } from '../../../services/date.service';
import { Filter } from '../table.component.interface';
import { DialogData } from './table-filters-dialog.component.interface';

@Component({
  selector: 'app-table-filters-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    ReactiveFormsModule,
    MatRadioModule,
    TranslatePipe,
  ],
  providers: [
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'ar',
    },
    provideNativeDateAdapter(),
  ],
  templateUrl: './table-filters-dialog.component.html',
  styleUrl: './table-filters-dialog.component.scss',
})
export class TableFiltersDialogComponent {
  private fb = inject(NonNullableFormBuilder);
  private date = inject(DateService);
  public ref = inject(MatDialogRef);
  public data: DialogData = inject(MAT_DIALOG_DATA);

  public onSubmit = new EventEmitter<Filter[]>();
  public form = this.fb.group({});

  constructor() {
    this.data.filters.forEach((filter) => {
      if (filter.type === 'date' || filter.type === 'datetime_date') {
        if (
          filter.defaultValue !== undefined &&
          this.date.containsSeparator(filter.defaultValue)
        ) {
          const [startDate, endDate] = this.date.extractTwoDates(
            filter.defaultValue
          );

          this.form.addControl(
            filter.name + '_gt',
            this.fb.control(startDate)
          );

          this.form.addControl(
            filter.name + '_lt',
            this.fb.control(endDate)
          );

          this.form.addControl(
            filter.name + '_type',
            this.fb.control('range')
          );

          this.form.addControl(filter.name, this.fb.control(''));

          return;
        }

        this.form.addControl(
          filter.name + '_gt',
          this.fb.control('')
        );
        this.form.addControl(
          filter.name + '_lt',
          this.fb.control('')
        );
        this.form.addControl(
          filter.name + '_type',
          this.fb.control('single')
        );
      }

      if (filter.type === 'boolean') {
        this.form.addControl(filter.name, this.fb.control(filter.defaultValue ?? '0'));
        return;
      }

      this.form.addControl(
        filter.name,
        this.fb.control(filter.defaultValue ?? '')
      );
    });
  }

  submitFilters() {
    let usedFilters: Filter[] = [];
    const formValue = this.form.value as any;

    this.data.filters.forEach((filter) => {
      if (filter.type === 'date' || filter.type === 'datetime_date') {
        if (formValue[filter.name + '_type'] === 'single') {
          if (formValue[filter.name] instanceof Date) {
            const dateValue = this.date.format(
              formValue[filter.name],
              'yyyy-MM-dd'
            );

            usedFilters.push({
              name: filter.name,
              type: 'date',
              value: dateValue,
            });
          }
        } else {
          if (
            formValue[filter.name + '_gt'] instanceof Date &&
            formValue[filter.name + '_lt'] instanceof Date
          ) {
            const startDateValue = this.date.format(
              formValue[filter.name + '_gt'],
              'yyyy-MM-dd'
            );
            const endDateValue = this.date.format(
              formValue[filter.name + '_lt'],
              'yyyy-MM-dd'
            );

            usedFilters.push({
              name: filter.name,
              type: 'date_range',
              value: this.date.concatTwoDates(startDateValue, endDateValue),
            });
          }
        }
      } else if (filter.type === 'exact_null') {
        const value = formValue[filter.name];

        if (value !== '') {
          usedFilters.push({
            name: filter.name,
            type: 'select_null',
            value,
          });
        }
      } else if (filter.type === 'exact') {
        const value = formValue[filter.name];

        if (value !== '') {
          usedFilters.push({
            name: filter.name,
            type: 'select',
            value,
          });
        }
      } else if (filter.type === 'boolean') {
        const value = formValue[filter.name];
        
        usedFilters.push({
          name: filter.name,
          type: 'boolean',
          value: value,
        })
      }
    });

    this.onSubmit.emit(usedFilters);

    this.ref.close();
  }
}
