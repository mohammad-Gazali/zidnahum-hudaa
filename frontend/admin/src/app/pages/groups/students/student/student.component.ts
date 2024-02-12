import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TableComponent } from '../../../../shared/table/table.component';
import { TableComponentConfig } from '../../../../shared/table/table.component.interface';
import { Student } from '../../../../services/api/admin/models';
import { StudentsService } from '../../../../services/api/admin/services';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentComponent {
  private students = inject(StudentsService);

  public config: TableComponentConfig<Student> = {
    columns: {
      name: {
        display: 'normal',
      },
      mother_name: {
        display: 'normal',
      },
      category: {
        display: 'relation',
        filterType: 'exact_null',
        getFieldValueFunc: () => {
          return this.students.studentsCategoryList();
        },
      },
      group: {
        display: 'relation',
        filterType: 'exact_null',
        getFieldValueFunc: () => {
          return this.students.studentsGroupList();
        },
      },
      registered_at: {
        display: 'normal',
        filterType: 'date',
      }
    },
    searchField: 'name',
    hasPagination: true,
    dataFunc: (params) => this.students.studentsStudentList(params),
    getUrlFunc: (id) => {
      return `/students/student/view/${id}`;
    },
  };
}
