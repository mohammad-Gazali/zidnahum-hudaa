import { Component, inject } from '@angular/core';
import { CreateComponent } from '../../../../../shared/create/create.component';
import { CreateComponentConfig } from '../../../../../shared/create/create.component.interface';
import { StudentsService } from '../../../../../services/api/admin/services';
import { MasjedService } from '../../../../../services/masjed.service';
import { StudentCreate } from '../../../../../services/api/admin/models';

@Component({
  selector: 'app-student-create',
  standalone: true,
  imports: [CreateComponent],
  templateUrl: './student-create.component.html',
  styleUrl: './student-create.component.scss'
})
export class StudentCreateComponent {
  private students = inject(StudentsService);
  private masjed = inject(MasjedService);

  public config: CreateComponentConfig<StudentCreate> = {
    createFunc: (body) => {
      return this.students.studentsStudentCreate(body);
    },
    tableRoute: '/students/student',
    fields: {
      name: {
        type: 'string',
        required: true,
      },
      mother_name: {
        type: 'string',
      },
      birthdate: {
        type: 'date',
      },
      masjed: {
        type: 'relation',
        nullable: false,
        required: true,
        getFieldValueFunc: () => {
          return this.masjed.getMasjeds();
        },
      },
      address: {
        type: 'string',
      },
      static_phone: {
        type: 'string',
      },
      cell_phone: {
        type: 'string',
      },
      father_phone: {
        type: 'string',
      },
      mother_phone: {
        type: 'string',
      },
      category: {
        type: 'relation',
        nullable: true,
        getFieldValueFunc: () => {
          return this.students.studentsCategoryList();
        },
      },
      father_work: {
        type: 'string',
      },
      notes: {
        type: 'string',
      },
      bring_him: {
        type: 'string',
      },
      group: {
        type: 'relation',
        nullable: true,
        getFieldValueFunc: () => {
          return this.students.studentsGroupList();
        },
      },
      parts_received: {
        type: 'string',
      },
    }
  };
}
