import { Component, input } from '@angular/core';
import { MemoPipe, MemorizeMessageForStudent, MessageType, TestPipe } from '@shared';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-student-activities-messages-container',
  standalone: true,
  imports: [
    MatCard,
    MemoPipe,
    TestPipe
  ],
  templateUrl: './student-activities-messages-container.component.html',
  styleUrl: './student-activities-messages-container.component.scss'
})
export class StudentActivitiesMessagesContainerComponent {
  public messages = input.required<MemorizeMessageForStudent[]>();
  protected messageType = MessageType;
}
