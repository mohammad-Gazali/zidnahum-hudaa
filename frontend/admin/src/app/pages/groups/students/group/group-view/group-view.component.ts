import { Component, inject } from '@angular/core';
import { ViewComponent } from '../../../../../shared/view/view.component';
import { ViewComponentConfig } from '../../../../../shared/view/view.component.interface';
import { StudentGroupList, StudentGroupUpdate } from '../../../../../services/api/admin/models';
import { StudentsService } from '../../../../../services/api/admin/services';

@Component({
  selector: 'app-group-view',
  standalone: true,
  imports: [ViewComponent],
  templateUrl: './group-view.component.html',
  styleUrl: './group-view.component.scss'
})
export class GroupViewComponent {
  private students = inject(StudentsService);

  public config: ViewComponentConfig<StudentGroupList, StudentGroupUpdate> = {
    fieldsInfo: {},
    groupName: 'students',
    itemNameAndRouteName: 'student-group',
    viewFunc: (id) => this.students.studentsGroupRead(id),
    deleteFunc: (id) => this.students.studentsGroupDelete(id),
    updateFunc: (id, data) => this.students.studentsGroupUpdate({ id, data }),
  }
}
