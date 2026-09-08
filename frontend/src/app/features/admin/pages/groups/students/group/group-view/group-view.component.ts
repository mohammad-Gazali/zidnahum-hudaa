import { Component } from '@angular/core';
import { ViewComponent, ViewComponentConfig } from '@admin/components';
import {
  StudentGroupList,
  StudentGroupUpdate,
} from '@shared';
import { StudentsBase } from '../../students.base';

@Component({
  selector: 'app-student-group-view',
  imports: [ViewComponent],
  templateUrl: './group-view.component.html',
  styleUrl: './group-view.component.scss',
})
export class StudentGroupViewComponent extends StudentsBase {
  public config: ViewComponentConfig<StudentGroupList, StudentGroupUpdate> = {
    fieldsInfo: {},
    groupName: 'students',
    itemNameAndRouteName: 'student-group',
    viewFunc: (id) => this.studentsGroup.adminStudentsGroupRetrieve(Number(id)),
    deleteFunc: (id) =>
      this.studentsGroup.adminActionsStudentGroupDeleteCreate({ ids: [Number(id)] }),
    updateFunc: (id, data) =>
      this.studentsGroup.adminStudentsGroupUpdate(Number(id), data),
  };
}
