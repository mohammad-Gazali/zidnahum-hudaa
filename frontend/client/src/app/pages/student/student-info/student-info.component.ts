import { Component, inject } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { AuthService, MasjedPipe } from '@shared';
import { StudentComponent } from '../student.component';

@Component({
  selector: 'app-student-info',
  standalone: true,
  imports: [MatFormField, MatLabel, MatInput, MasjedPipe],
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
  public student = inject(StudentComponent).student;
  public currentUser = inject(AuthService).currentUser;
}
