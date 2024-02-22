import { Component, inject } from '@angular/core';
import { TableComponent } from '../../../../shared/table/table.component';
import { TableComponentConfig } from '../../../../shared/table/table.component.interface';
import { StudentsService } from '../../../../services/api/admin/services';
import { StudentCategoryList } from '../../../../services/api/admin/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
  private students = inject(StudentsService);

  public config: TableComponentConfig<StudentCategoryList> = {
    createUrl: '/students/student-category/create',
    hasPagination: false,
    dataFunc: (options) => {
      return this.students.studentsCategoryList(options);
    },
    getUrlFunc: (id) => `/students/student-category/view/${id}`,
    columns: {
      name: {
        display: 'normal',
      },
    },
  };

  constructor () {
    this.students.studentsCategoryList
  }
}
