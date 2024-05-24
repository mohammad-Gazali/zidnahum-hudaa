import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatCard } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { AuthService } from '@shared';
import { StudentComponent } from '../student.component';

@Component({
  selector: 'app-student-notes',
  standalone: true,
  imports: [MatCard, MatButton, MatIcon, DatePipe],
  templateUrl: './student-notes.component.html',
  styleUrl: './student-notes.component.scss'
})
export class StudentNotesComponent {
  private auth = inject(AuthService);
  public student = inject(StudentComponent).student;

  // TODO
  removeNote() {

  }

  // TODO
  hasGroup(): boolean {
    // TODO
    return !!this.auth.currentUser()?.groups.some(a => a)
  }
}
