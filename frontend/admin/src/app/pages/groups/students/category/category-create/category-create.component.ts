import { Component, inject } from '@angular/core';
import { CreateComponent } from '../../../../../shared/create/create.component';
import { CreateComponentConfig } from '../../../../../shared/create/create.component.interface';
import { StudentCategoryCreate } from '../../../../../services/api/admin/models';
import { StudentsService } from '../../../../../services/api/admin/services';

@Component({
  selector: 'app-category-create',
  standalone: true,
  imports: [CreateComponent],
  templateUrl: './category-create.component.html',
  styleUrl: './category-create.component.scss'
})
export class CategoryCreateComponent {
  private students = inject(StudentsService);

  public config: CreateComponentConfig<StudentCategoryCreate> = {
    tableRoute: '/students/student-category',
    createFunc: (body) => this.students.studentsCategoryCreate(body),
    fields: {
      name: {
        type: 'string',
      }
    },
  }
}
