import { Component, inject } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { StudentComponent } from '../student.component';
import { EXTRA_HADEETH_LABEL } from '@shared';

@Component({
    selector: 'app-student-general',
    imports: [MatCard, MatDivider],
    templateUrl: './student-general.component.html',
    styleUrl: './student-general.component.scss'
})
export class StudentGeneralComponent {
  protected student = inject(StudentComponent).student;
  protected extraHadeethLabel = EXTRA_HADEETH_LABEL;
}
