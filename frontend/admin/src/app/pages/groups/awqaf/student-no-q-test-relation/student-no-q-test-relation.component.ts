import { Component } from '@angular/core';
import { TableComponent } from '../../../../shared/table/table.component';
import { AwqafBase } from '../awqaf.base';
import { TableComponentConfig } from '../../../../shared/table/table.component.interface';
import { AwqafNoQStudentRelationList } from '../../../../services/api/admin/models';

@Component({
  selector: 'app-student-no-q-test-relation',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './student-no-q-test-relation.component.html',
  styleUrl: './student-no-q-test-relation.component.scss'
})
export class StudentNoQTestRelationComponent extends AwqafBase {
  public config: TableComponentConfig<AwqafNoQStudentRelationList> = {
    hasPagination: true,
    useStudentMasjedFilter: true,
    dataFunc: options => this.awqaf.awqafStudentNoQRelationList(options),
    getUrlFunc: id => `/awqaf/student-no-q-test-relation/view/${id}`,
    searchField: 'student_name',
    columns: {
      student: {
        display: 'link',
        stringField: 'student_name',
        getUrlFunc: (id) => `/students/student/view/${id}`,
      },
      student_name: {
        display: 'ignore',
      },
      test: {
        display: 'relation',
        filterType: 'exact',
        getFieldValueFunc: () => this.awqaf.awqafTestNoQList(),
      },
      is_old: {
        display: 'boolean',
        filterType: 'boolean',
      },
    }
  };
}
