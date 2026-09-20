import { Component } from '@angular/core';
import { TableComponent, TableComponentConfig } from '@admin/components';
import { deleteModelAction } from '@admin/helpers';
import { AwqafNoQStudentRelationList } from '@shared';
import { AwqafBase } from '../awqaf.base';

@Component({
  selector: 'app-student-no-q-test-relation',
  imports: [TableComponent],
  templateUrl: './student-no-q-test-relation.component.html',
  styleUrl: './student-no-q-test-relation.component.scss',
})
export class StudentNoQTestRelationComponent extends AwqafBase {
  public config: TableComponentConfig<AwqafNoQStudentRelationList> = {
    hasPagination: true,
    useStudentMasjedFilter: true,
    dataFunc: (options) =>
      this.studentNoQRelation.adminAwqafStudentNoQRelationList(options),
    getUrlFunc: (id) => `/awqaf/student-no-q-test-relation/view/${id}`,
    searchField: 'student_name',
    actions: [
      deleteModelAction('أسبار الطالب بالأوقاف بغير القرآن', (ids) =>
        this.studentNoQRelation.adminActionsAwqafNoQStudentRelationDeleteCreate({
          ids,
        }),
      ),
    ],
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
        getFieldValueFunc: () => this.awqaf.adminAwqafTestNoQList(),
      },
      is_old: {
        display: 'boolean',
        filterType: 'boolean',
      },
    },
  };
}
