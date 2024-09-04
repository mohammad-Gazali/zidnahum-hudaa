import { Component, inject } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { StudentComponent } from '../student.component';

@Component({
  selector: 'app-student-general',
  standalone: true,
  imports: [MatCard, MatDivider],
  templateUrl: './student-general.component.html',
  styleUrl: './student-general.component.scss'
})
export class StudentGeneralComponent {
  protected student = inject(StudentComponent).student;
}
