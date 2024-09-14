import { Component, inject } from '@angular/core';
import { CreateComponent } from '../../../../../shared/create/create.component';
import { CreateComponentConfig } from '../../../../../shared/create/create.component.interface';
import { MasjedService } from '../../../../../services/masjed.service';
import { StudentCreate } from '../../../../../services/api/admin/models';
import { StudentsBase } from '../../students.base';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-student-create',
  standalone: true,
  imports: [CreateComponent],
  templateUrl: './student-create.component.html',
  styleUrl: './student-create.component.scss'
})
export class StudentCreateComponent extends StudentsBase {
  private masjed = inject(MasjedService);

  public config: CreateComponentConfig<StudentCreate> = {
    createFunc: (body) => {
      return this.students.studentsStudentCreate(body);
    },
    tableRoute: '/students/student',
    fields: {
      name: {
        type: 'string',
        validators: [Validators.required],
      },
      mother_name: {
        type: 'string',
        validators: [Validators.required],
      },
      birthdate: {
        type: 'date',
      },
      masjed: {
        type: 'relation',
        relationType: 'normal',
        validators: [Validators.required],
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
        relationType: 'nullable',
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
        relationType: 'nullable',
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
