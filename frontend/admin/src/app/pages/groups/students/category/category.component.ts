import { Component } from '@angular/core';
import { TableComponent } from '../../../../shared/table/table.component';
import { TableComponentConfig } from '../../../../shared/table/table.component.interface';
import { StudentCategoryList } from '../../../../services/api/admin/models';
import { StudentsBase } from '../students.base';
import { deleteModelAction } from '../../../../common/delete-model-action';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
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
        this.actions.actionsStudentCategoryDeleteDelete({ ids })
      ),
    ],
    columns: {
      name: {
        display: 'normal',
      },
    },
  };
}
