import { Component, inject } from '@angular/core';
import { ViewComponent } from '../../../../../shared/view/view.component';
import { ViewComponentConfig } from '../../../../../shared/view/view.component.interface';
import { StudentsService } from '../../../../../services/api/admin/services';
import { StudentDetails, StudentUpdate } from '../../../../../services/api/admin/models';
import { MasjedService } from '../../../../../services/masjed.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-student-view',
  standalone: true,
  imports: [ViewComponent],
  templateUrl: './student-view.component.html',
  styleUrl: './student-view.component.scss',
})
export class StudentViewComponent {
  private students = inject(StudentsService);
  private masjed = inject(MasjedService);

  public config: ViewComponentConfig<StudentDetails, StudentUpdate> = {
    fieldsInfo: {
      name: {
        type: 'string',
        validators: [Validators.required],
      },
      alarbaein_alnawawia_new: {
        type: 'number',
        validators: [Validators.min(0), Validators.max(50)],
      },
      alarbaein_alnawawia_old: {
        type: 'number',
        validators: [Validators.min(0), Validators.max(50)],
      },
      allah_names_new: {
        type: 'boolean',
      },
      allah_names_old: {
        type: 'boolean',
      },
      birthdate: {
        type: 'date',
      },
      category: {
        type: 'relation',
        nullable: true,
        getFieldValueFunc: () => {
          return this.students.studentsCategoryList();
        },
        getUrlFunc: (id) => {
          return id !== null ? `/students/category/view/${id}` : '';
        },
      },
      group: {
        type: 'relation',
        nullable: true,
        getFieldValueFunc: () => {
          return this.students.studentsGroupList();
        },
        getUrlFunc: (id) => {
          return id !== null ? `/students/group/view/${id}` : '';
        },
      },
      masjed: {
        type: 'relation',
        nullable: false,
        getFieldValueFunc: () => {
          return this.masjed.getMasjeds();
        },
      },
      q_awqaf_test: {
        type: 'custom',
      },
      q_awqaf_test_explaining: {
        type: 'custom',
      },
      q_awqaf_test_looking: {
        type: 'custom',
      },
      q_memorizing: {
        type: 'custom',
      },
      q_test: {
        type: 'custom',
      },
      registered_at: {
        type: 'date',
        nonEditable: true,
      },
      riad_alsaalihin_new: {
        type: 'number',
      },
      riad_alsaalihin_old: {
        type: 'number',
      },
    },
    groupName: 'students',
    itemNameAndRouteName: 'student',
    viewFunc: (id) => {      
      return this.students.studentsStudentRead(id);
    },
    deleteFunc: (id) => {
      return this.students.studentsStudentDelete(id)
    },
    updateFunc: (id, data) => {
      return this.students.studentsStudentUpdate({
        id,
        data,
      })
    }
  };
}
