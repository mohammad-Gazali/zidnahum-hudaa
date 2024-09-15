import { Component, computed, inject } from '@angular/core';
import { StudentComponent } from '../student.component';
import { MatCard } from '@angular/material/card';
import { DatePipe } from '@angular/common';
import { MatDivider } from '@angular/material/divider';
import {
  StudentActivitiesMessagesContainerComponent
} from './student-activities-messages-container/student-activities-messages-container.component';

@Component({
  selector: 'app-student-activities',
  standalone: true,
  imports: [
    MatCard,
    DatePipe,
    MatDivider,
    StudentActivitiesMessagesContainerComponent
  ],
  templateUrl: './student-activities.component.html',
  styleUrl: './student-activities.component.scss'
})
export class StudentActivitiesComponent {
  protected student = inject(StudentComponent).student;

  protected swapHalves = computed(() => Number(this.student()!.current_date.slice(8)) <= 15);
  protected firstHalf = computed(() => {
    const month = Number(this.student()!.current_date.split('-')[1]);
    return 'التسميعات من ' + `${month}/1 ` + 'إلى ' + `${month}/15`;
  });
  protected secondHalf = computed(() => {
    const month = Number(this.student()!.current_date.split('-')[1]);
    const previousMonth = month === 1 ? 12 : month - 1;

    return this.swapHalves()
      ? 'التسميعات من ' + `${previousMonth}/16 ` + 'إلى آخر الشهر'
      : 'التسميعات من ' + `${month}/16 ` + 'إلى آخر الشهر';
  });
}
