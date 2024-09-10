import { Component, inject } from '@angular/core';
import { TableComponent } from '../../../../shared/table/table.component';
import { TableComponentConfig } from '../../../../shared/table/table.component.interface';
import { StudentList } from '../../../../services/api/admin/models';
import { MasjedService } from '../../../../services/masjed.service';
import { StudentsBase } from '../students.base';
import { deleteModelAction } from '../../../../common/delete-model-action';
import { LevelService } from '../../../../services/level.service';

@Component({
  selector: 'app-student',
  standalone: true,
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
    dataFunc: (params) => this.students.studentsStudentList(params),
    getUrlFunc: (id) => {
      return `/students/student/view/${id}`;
    },
    createUrl: '/students/student/create',
    actions: [
      deleteModelAction('الطلاب', (ids) =>
        this.actions.actionsStudentDeleteDelete({ ids })
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
        }
      },
      level: {
        display: 'relation',
        filterType: 'exact',
        getFieldValueFunc: () => {
          return this.level.getLevels();
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
  };
}
