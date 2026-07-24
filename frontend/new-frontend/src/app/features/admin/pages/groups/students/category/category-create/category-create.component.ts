import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { CreateComponent, CreateComponentConfig } from '@admin/components';
import { StudentCategoryCreate } from '@shared';
import { StudentsBase } from '../../students.base';

@Component({
  selector: 'app-category-create',
  imports: [CreateComponent],
  templateUrl: './category-create.component.html',
  styleUrl: './category-create.component.scss',
})
export class CategoryCreateComponent extends StudentsBase {
  public config: CreateComponentConfig<StudentCategoryCreate> = {
    tableRoute: '/students/student-category',
    createFunc: (body) => this.students.studentsCategoryCreate(body),
    fields: {
      name: {
        type: 'string',
        validators: [Validators.required],
      },
    },
  };
}
