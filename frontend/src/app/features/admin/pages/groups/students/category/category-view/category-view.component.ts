import { Component } from '@angular/core';
import { ViewComponent, ViewComponentConfig } from '@admin/components';
import {
  StudentCategoryList,
  StudentUpdate,
} from '@shared';
import { StudentsBase } from '../../students.base';

@Component({
  selector: 'app-category-view',
  imports: [ViewComponent],
  templateUrl: './category-view.component.html',
  styleUrl: './category-view.component.scss',
})
export class CategoryViewComponent extends StudentsBase {
  public config: ViewComponentConfig<StudentCategoryList, StudentUpdate> = {
    fieldsInfo: {},
    groupName: 'students',
    itemNameAndRouteName: 'student-category',
    viewFunc: (id) => this.studentsCategory.adminStudentsCategoryRetrieve(Number(id)),
    deleteFunc: (id) =>
      this.studentsCategory.adminActionsStudentCategoryDeleteCreate({ ids: [Number(id)] }),
    updateFunc: (id, data) =>
      this.studentsCategory.adminStudentsCategoryUpdate(Number(id), data),
  };
}
