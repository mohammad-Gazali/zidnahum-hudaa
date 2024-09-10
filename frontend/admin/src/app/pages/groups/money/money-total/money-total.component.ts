import { Component, inject } from '@angular/core';
import { TableComponent } from '../../../../shared/table/table.component';
import { TableComponentConfig } from '../../../../shared/table/table.component.interface';
import { MoneyTotal } from '../../../../services/api/admin/models/money-total';
import { ExtraService } from '../../../../services/api/admin/services';

@Component({
  selector: 'app-money-total',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './money-total.component.html',
  styleUrl: './money-total.component.scss'
})
export class MoneyTotalComponent {
  private extra = inject(ExtraService);

  protected config: TableComponentConfig<MoneyTotal> = {
    hasPagination: true,
    dataFunc: (options) => this.extra.extraMoneyTotalList(options),
    getUrlFunc: id => `/students/student/view/${id}`,
    searchField: 'student_name',
    useStudentMasjedFilter: true,
    columns: {
      name: { display: 'normal' },
      sum: { display: 'normal' }
    },
  }
}
