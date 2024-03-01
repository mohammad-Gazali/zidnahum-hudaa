import { Component } from '@angular/core';
import { CreateComponent } from '../../../../../shared/create/create.component';
import { CreateComponentConfig } from '../../../../../shared/create/create.component.interface';
import { StudentGroupCreate } from '../../../../../services/api/admin/models';
import { StudentsBase } from '../../students.base';

@Component({
  selector: 'app-student-group-create',
  standalone: true,
  imports: [CreateComponent],
  templateUrl: './group-create.component.html',
  styleUrl: './group-create.component.scss'
})
export class StudentGroupCreateComponent extends StudentsBase {
  public config: CreateComponentConfig<StudentGroupCreate> = {
    tableRoute: '/students/student-group',
    createFunc: (body) => this.students.studentsGroupCreate(body),
    fields: {
      name: {
        type: 'string',
      }
    }
  }
}
