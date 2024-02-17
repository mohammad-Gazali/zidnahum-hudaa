import { Component, inject } from '@angular/core';
import { TableComponent } from '../../../../shared/table/table.component';
import { TableComponentConfig } from '../../../../shared/table/table.component.interface';
import { StudentList } from '../../../../services/api/admin/models';
import { StudentsService } from '../../../../services/api/admin/services';
import { MasjedService } from '../../../../services/masjed.service';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss',
})
export class StudentComponent {
  private students = inject(StudentsService);
  private masjed = inject(MasjedService);

  public config: TableComponentConfig<StudentList> = {
    columns: {
      name: {
        display: 'normal',
      },
      mother_name: {
        display: 'normal',
      },
      masjed: {
        display: 'relation',
        filterType: 'exact',
        getFieldValueFunc: () => {
          return this.masjed.getMasjeds();
        }
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
