import { Component } from '@angular/core';
import { ViewComponent } from '../../../../../shared/view/view.component';
import { ViewComponentConfig } from '../../../../../shared/view/view.component.interface';
import { StudentGroupList, StudentGroupUpdate } from '../../../../../services/api/admin/models';
import { StudentsBase } from '../../students.base';

@Component({
  selector: 'app-student-group-view',
  standalone: true,
  imports: [ViewComponent],
  templateUrl: './group-view.component.html',
  styleUrl: './group-view.component.scss'
})
export class StudentGroupViewComponent extends StudentsBase {
  public config: ViewComponentConfig<StudentGroupList, StudentGroupUpdate> = {
    fieldsInfo: {},
    groupName: 'students',
    itemNameAndRouteName: 'student-group',
    viewFunc: (id) => this.students.studentsGroupRead(id),
    deleteFunc: (id) => this.students.studentsGroupDelete(id),
    updateFunc: (id, data) => this.students.studentsGroupUpdate({ id, data }),
  }
}
