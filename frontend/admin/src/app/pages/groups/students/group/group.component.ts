import { Component } from '@angular/core';
import { TableComponent } from '../../../../shared/table/table.component';
import { TableComponentConfig } from '../../../../shared/table/table.component.interface';
import { StudentGroupList } from '../../../../services/api/admin/models';
import { StudentsBase } from '../students.base';
import { deleteModelAction } from '../../../../common/delete-model-action';

@Component({
  selector: 'app-student-group',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './group.component.html',
  styleUrl: './group.component.scss'
})
export class StudentGroupComponent extends StudentsBase {
  public config: TableComponentConfig<StudentGroupList> = {
    createUrl: '/students/student-group/create',
    getUrlFunc: (id) => `/students/student-group/view/${id}`,
    dataFunc: (options) => {
      return this.students.studentsGroupList(options);
    },
    hasPagination: false,
    actions: [
      deleteModelAction('مجموعات الطلاب', (ids) =>
        this.actions.actionsStudentGroupDeleteDelete({ ids })
      ),
    ],
    columns: {
      name: {
        display: 'normal',
      }
    },
  }
}
