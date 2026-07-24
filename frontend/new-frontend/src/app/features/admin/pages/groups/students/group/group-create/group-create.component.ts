import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { CreateComponent, CreateComponentConfig } from '@admin/components';
import { StudentGroupCreate } from '@shared';
import { StudentsBase } from '../../students.base';

@Component({
  selector: 'app-student-group-create',
  imports: [CreateComponent],
  templateUrl: './group-create.component.html',
  styleUrl: './group-create.component.scss',
})
export class StudentGroupCreateComponent extends StudentsBase {
  public config: CreateComponentConfig<StudentGroupCreate> = {
    tableRoute: '/students/student-group',
    createFunc: (body) => this.students.studentsGroupCreate(body),
    fields: {
      name: {
        type: 'string',
        validators: [Validators.required],
      },
    },
  };
}
