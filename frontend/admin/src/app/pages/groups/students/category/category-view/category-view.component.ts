import { Component, inject } from '@angular/core';
import { ViewComponent } from '../../../../../shared/view/view.component';
import { ViewComponentConfig } from '../../../../../shared/view/view.component.interface';
import { StudentsService } from '../../../../../services/api/admin/services';
import { StudentCategoryList, StudentUpdate } from '../../../../../services/api/admin/models';

@Component({
  selector: 'app-category-view',
  standalone: true,
  imports: [ViewComponent],
  templateUrl: './category-view.component.html',
  styleUrl: './category-view.component.scss'
})
export class CategoryViewComponent {
  private students = inject(StudentsService);

  public config: ViewComponentConfig<StudentCategoryList, StudentUpdate> = {
    fieldsInfo: {},
    groupName: 'students',
    itemNameAndRouteName: 'student-category',
    viewFunc: (id) => this.students.studentsCategoryRead(id),
    deleteFunc: (id) => this.students.studentsCategoryDelete(id),
    updateFunc: (id, data) => this.students.studentsCategoryUpdate({ id, data }),
  };
}
