import { Component, inject } from '@angular/core';
import { TableComponent, TableComponentConfig } from '@admin/components';
import { StudentList } from '@shared';
import { deleteModelAction } from '@admin/helpers';
import { MasjedService } from '@shared';
import { LevelService } from '@admin/services';
import { StudentsBase } from '../students.base';

@Component({
  selector: 'app-student',
  imports: [TableComponent],
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss',
})
export class StudentComponent extends StudentsBase {
  private masjed = inject(MasjedService);
  private level = inject(LevelService);

  public config: TableComponentConfig<StudentList> = {
    searchField: 'name',
    hasPagination: true,
    dataFunc: (params) => this.students.adminStudentsStudentList(params),
    getUrlFunc: (id) => {
      return `/students/student/view/${id}`;
    },
    createUrl: '/students/student/create',
    actions: [
      deleteModelAction('الطلاب', (ids) =>
        this.students.adminActionsStudentDeleteCreate({ ids }),
      ),
    ],
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
        },
      },
      level: {
        display: 'relation',
        filterType: 'exact',
        getFieldValueFunc: () => {
          return this.level.getLevels();
        },
      },
      category: {
        display: 'relation',
        filterType: 'exact_null',
        getFieldValueFunc: () => {
          return this.studentsCategory.adminStudentsCategoryList();
        },
      },
      group: {
        display: 'relation',
        filterType: 'exact_null',
        getFieldValueFunc: () => {
          return this.studentsGroup.adminStudentsGroupList();
        },
      },
      registered_at: {
        display: 'normal',
        filterType: 'date',
      },
    },
  };
}
