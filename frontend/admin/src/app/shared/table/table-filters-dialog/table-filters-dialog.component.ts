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
import { formatDate } from '@angular/common';

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
  public onSubmit = new EventEmitter<any>();
  
  private fb = inject(FormBuilder);
  public form = this.fb.group({});

  constructor () {    
    this.data.filters.forEach(filter => {
      if (filter.type === 'date') {
        this.form.addControl(filter.name + '__gt', this.fb.nonNullable.control(''));
        this.form.addControl(filter.name + '__lt', this.fb.nonNullable.control(''));
        this.form.addControl(filter.name + '__type', this.fb.nonNullable.control('single'));
      }
      this.form.addControl(filter.name, this.fb.nonNullable.control(''));
    })
  }

  submitFilters() {
    const result: any = {};

    // TODO: continue here


    this.onSubmit.emit(result);
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
