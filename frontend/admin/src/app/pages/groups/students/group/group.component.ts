import { Component, inject } from '@angular/core';
import { TableComponent } from '../../../../shared/table/table.component';
import { TableComponentConfig } from '../../../../shared/table/table.component.interface';
import { StudentsService } from '../../../../services/api/admin/services';
import { StudentGroupList } from '../../../../services/api/admin/models';

@Component({
  selector: 'app-student-group',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './group.component.html',
  styleUrl: './group.component.scss'
})
export class StudentGroupComponent {
  private students = inject(StudentsService);

  public config: TableComponentConfig<StudentGroupList> = {
    createUrl: '/students/student-group/create',
    getUrlFunc: (id) => `/students/student-group/view/${id}`,
    dataFunc: (options) => {
      return this.students.studentsGroupList(options);
    },
    hasPagination: false,
    columns: {
      name: {
        display: 'normal',
      }
    },
  }
}
