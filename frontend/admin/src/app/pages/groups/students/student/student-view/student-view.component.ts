import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ViewComponent } from '../../../../../shared/view/view.component';
import { ViewComponentConfig } from '../../../../../shared/view/view.component.interface';
import { StudentsService } from '../../../../../services/api/admin/services';
import { StudentDetails } from '../../../../../services/api/admin/models';

@Component({
  selector: 'app-student-view',
  standalone: true,
  imports: [ViewComponent],
  templateUrl: './student-view.component.html',
  styleUrl: './student-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentViewComponent {
  private students = inject(StudentsService);

  public config: ViewComponentConfig<StudentDetails> = {
    fieldsInfo: {
      alarbaein_alnawawia_new: {
        type: 'number'
      },
      alarbaein_alnawawia_old: {
        type: 'number'
      },
      allah_names_new: {
        type: 'boolean'
      },
      allah_names_old: {
        type: 'boolean'
      },
      birthdate: {
        type: 'date'
      },
      category: {
        type: 'relation'
      },
      group: {
        type: 'relation'
      },
      masjed: {
        type: 'relation'
      },
      q_awqaf_test: {
        type: 'custom'
      },
      q_awqaf_test_explaining: {
        type: 'custom'
      },
      q_awqaf_test_looking: {
        type: 'custom'
      },
      q_memorizing: {
        type: 'custom'
      },
      q_test: {
        type: 'custom'
      },
      registered_at: {
        type: 'date'
      },
      riad_alsaalihin_new: {
        type: 'number'
      },
      riad_alsaalihin_old: {
        type: 'number'
      },
    },
    editable: true,
    viewFunc: (id) => {
      return this.students.studentsStudentRead(id);
    }
  }
}
