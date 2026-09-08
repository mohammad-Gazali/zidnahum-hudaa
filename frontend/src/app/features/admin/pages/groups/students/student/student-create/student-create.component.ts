import { Component, inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { CreateComponent, CreateComponentConfig } from '@admin/components';
import { MasjedService, LevelService, StudentCreate } from '@shared';
import { StudentsBase } from '../../students.base';

@Component({
  selector: 'app-student-create',
  imports: [CreateComponent],
  templateUrl: './student-create.component.html',
  styleUrl: './student-create.component.scss',
})
export class StudentCreateComponent extends StudentsBase {
  private masjed = inject(MasjedService);
  private level = inject(LevelService);

  public config: CreateComponentConfig<StudentCreate> = {
    createFunc: (body) => {
      return this.students.adminStudentsStudentCreate(body);
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
          return this.studentsCategory.adminStudentsCategoryList();
        },
      },
      level: {
        type: 'relation',
        relationType: 'normal',
        getFieldValueFunc: () => {
          return this.level.getLevels();
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
          return this.studentsGroup.adminStudentsGroupList();
        },
      },
      parts_received: {
        type: 'string',
      },
      q_viewing: {
        type: 'string',
      },
      extra_hadeeth: {
        type: 'number',
      },
    },
  };
}
