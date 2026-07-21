import { Component, inject } from '@angular/core';
import { TableComponent } from '../../../../shared/table/table.component';
import { TableComponentConfig } from '../../../../shared/table/table.component.interface';
import { MoneyTotal } from '@shared';
import { ExtraService } from '@shared';

@Component({
  selector: 'app-money-total',
  imports: [TableComponent],
  templateUrl: './money-total.component.html',
  styleUrl: './money-total.component.scss',
})
export class MoneyTotalComponent {
  private extra = inject(ExtraService);

  protected config: TableComponentConfig<MoneyTotal> = {
    hasPagination: true,
    dataFunc: (options) => this.extra.extraMoneyTotalList(options),
    getUrlFunc: (id) => `/students/student/view/${id}`,
    searchField: 'student_name',
    useStudentMasjedFilter: true,
    columns: {
      name: { display: 'normal' },
      sum: { display: 'normal' },
    },
  };
}
