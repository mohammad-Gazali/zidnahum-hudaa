import { Component, inject } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { AuthService, LevelPipe, MasjedPipe } from '@shared';
import { StudentComponent } from '../student.component';

@Component({
  selector: 'app-student-info',
  standalone: true,
  imports: [MatFormField, MatLabel, MatInput, MasjedPipe, LevelPipe],
  templateUrl: './student-info.component.html',
  styleUrl: './student-info.component.scss',
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'outline',
        subscriptSizing: 'dynamic',
      },
    }
  ],
})
export class StudentInfoComponent {
  protected student = inject(StudentComponent).student;
  protected currentUser = inject(AuthService).currentUser;
}
