import { ChangeDetectionStrategy, Component, EventEmitter, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
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
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DateService } from '../../../services/date.service';
import { Filter } from '../table.component';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableFiltersDialogComponent {
  public ref = inject(MatDialogRef);
  public data: DialogData = inject(MAT_DIALOG_DATA);
  public onSubmit = new EventEmitter<Filter[]>();
  
  private fb = inject(FormBuilder);
  private date = inject(DateService);
  public form = this.fb.group({});

  constructor () {    
    this.data.filters.forEach(filter => {
      if (filter.type === 'date') {
        this.form.addControl(filter.name + '_gt', this.fb.nonNullable.control(''));
        this.form.addControl(filter.name + '_lt', this.fb.nonNullable.control(''));
        this.form.addControl(filter.name + '_type', this.fb.nonNullable.control('single'));
      }
      this.form.addControl(filter.name, this.fb.nonNullable.control(''));
    })
  }

  submitFilters() {
    const usedFilters: Filter[] = [];
    const formValue = this.form.value as any;

    this.data.filters.forEach(filter => {
      if (filter.type === 'date') {
        if (formValue[filter.name + '_type'] === 'single') {
          if (formValue[filter.name] instanceof Date) {
            const dateValue = this.date.format(formValue[filter.name]);

            usedFilters.push({
              name: filter.name,
              type: 'date',
              value: dateValue,
            });
          }

        } else {
          if (formValue[filter.name + '_gt'] instanceof Date && formValue[filter.name + '_lt'] instanceof Date) {
            const startDateValue = this.date.format(formValue[filter.name + '_gt']);
            const endDateValue = this.date.format(formValue[filter.name + '_lt']);

            usedFilters.push({
              name: filter.name,
              type: 'date_range',
              value: `${startDateValue}=${endDateValue}`,
            })
          }

        }

      } else if (filter.type === 'exact_null') {
        const value = formValue[filter.name];

        if (value !== '') {
          usedFilters.push({
            name: filter.name,
            type: 'select_null',
            value,
          })
        }

      } else if (filter.type === 'exact') {
        const value = formValue[filter.name];

        if (value !== '') {
          usedFilters.push({
            name: filter.name,
            type: 'select',
            value,
          })
        }
      }
    })

    this.onSubmit.emit(usedFilters);

    this.ref.close();
  }
}

export interface DialogData {
  filters: DialogFilter[];
  extraData: ExtraData;
}

interface DialogFilter {
  name: string;
  type: 'date' | 'exact' | 'exact_null';
}

type ExtraData = {
  [key: string]: {
    data: {
      id: number;
      name: string;
    }[];
    map: Map<number, string>;
  };
};
