import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import {
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from '@angular/material/expansion';
import { StudentsService } from '../../services/api/services';
import { MatIcon } from '@angular/material/icon';
import { STUDENT } from './student.token';
import { StudentInfoComponent } from './student-info/student-info.component';
import { StudentActivitiesComponent } from './student-activities/student-activities.component';
import { StudentMemoComponent } from './student-memo/student-memo.component';
import { StudentTestComponent } from './student-test/student-test.component';
import { StudentAwqafTestComponent } from './student-awqaf-test/student-awqaf-test.component';
import { StudentGeneralComponent } from './student-general/student-general.component';
import { StudentNotesComponent } from './student-notes/student-notes.component';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [
    MatProgressSpinner,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatIcon,
    StudentInfoComponent,
    StudentActivitiesComponent,
    StudentMemoComponent,
    StudentTestComponent,
    StudentAwqafTestComponent,
    StudentGeneralComponent,
    StudentNotesComponent,
  ],
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss',
})
export class StudentComponent {
  private students = inject(StudentsService);
  private route = inject(ActivatedRoute);
  public student = inject(STUDENT);

  constructor() {
    this.students
      .studentsRead(this.route.snapshot.params['id'])
      .pipe(takeUntilDestroyed())
      .subscribe(this.student.set);
  }
}
