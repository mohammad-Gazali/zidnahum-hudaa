import { Component } from '@angular/core';
import { TableComponent, TableComponentConfig } from '@admin/components';
import { deleteModelAction } from '@admin/helpers';
import { StudentCategoryList } from '@shared';
import { StudentsBase } from '../students.base';

@Component({
  selector: 'app-category',
  imports: [TableComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent extends StudentsBase {
  public config: TableComponentConfig<StudentCategoryList> = {
    createUrl: '/students/student-category/create',
    hasPagination: false,
    dataFunc: (options) => {
      return this.students.studentsCategoryList(options);
    },
    getUrlFunc: (id) => `/students/student-category/view/${id}`,
    actions: [
      deleteModelAction('فئات الطلاب', (ids) =>
        this.actions.actionsStudentCategoryDeleteDelete({ ids }),
      ),
    ],
    columns: {
      name: {
        display: 'normal',
      },
    },
  };
}
