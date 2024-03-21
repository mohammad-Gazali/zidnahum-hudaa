import { Component } from '@angular/core';
import { ViewComponent } from '../../../../../shared/view/view.component';
import { ViewComponentConfig } from '../../../../../shared/view/view.component.interface';
import { AwqafNoQStudentRelationList } from '../../../../../services/api/admin/models';
import { AwqafBase } from '../../awqaf.base';

@Component({
  selector: 'app-student-no-q-test-relation-view',
  standalone: true,
  imports: [ViewComponent],
  templateUrl: './student-no-q-test-relation-view.component.html',
  styleUrl: './student-no-q-test-relation-view.component.scss'
})
export class StudentNoQTestRelationViewComponent extends AwqafBase {
  public config: ViewComponentConfig<AwqafNoQStudentRelationList> = {
    groupName: 'awqaf',
    itemNameAndRouteName: 'student-no-q-test-relation',
    viewFunc: id => this.awqaf.awqafStudentNoQRelationRead(id),
    deleteFunc: id => this.awqaf.awqafStudentNoQRelationDelete(id),
    fieldsInfo: {
      student: {
        type: 'link',
        stringField: 'student_name',
        getUrlFunc: (id) => `/students/sutdent/view/${id}`,
      },
      student_name: {
        type: 'ignore',
      },
      test: {
        type: 'relation',
        relationType: 'normal',
        getUrlFunc: (id) => `/awqaf/no-q-test/view/${id}`,
        getFieldValueFunc: () => this.awqaf.awqafTestNoQList(),
      },
      is_old: {
        type: 'boolean',
      }
    }
  }
}
