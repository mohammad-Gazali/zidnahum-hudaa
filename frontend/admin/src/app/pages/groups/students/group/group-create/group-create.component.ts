import { Component, inject } from '@angular/core';
import { CreateComponent } from '../../../../../shared/create/create.component';
import { StudentsService } from '../../../../../services/api/admin/services';
import { CreateComponentConfig } from '../../../../../shared/create/create.component.interface';
import { StudentGroupCreate } from '../../../../../services/api/admin/models';

@Component({
  selector: 'app-group-create',
  standalone: true,
  imports: [CreateComponent],
  templateUrl: './group-create.component.html',
  styleUrl: './group-create.component.scss'
})
export class GroupCreateComponent {
  private students = inject(StudentsService);

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
