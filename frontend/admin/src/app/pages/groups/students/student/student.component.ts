import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TableComponent } from '../../../../shared/table/table.component';
import { CellDisplay, TableComponentConfig } from '../../../../shared/table/table.component.config';
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
        isSearchField: true,
      },
      mother_name: {},
      category: {
        display: CellDisplay.RELATION,
        getFieldValueFunc: () => {
          return this.students.studentsCategoryList();
        },
      },
      group: {
        display: CellDisplay.RELATION,
        getFieldValueFunc: () => {
          return this.students.studentsGroupList();
        }
      },
      registered_at: {

      }
    },
    dataFunc: (params) => this.students.studentsStudentList(params),
    getUrlFunc: (id) => {
      return `/students/student/view/${id}`;
    }
  };
}
