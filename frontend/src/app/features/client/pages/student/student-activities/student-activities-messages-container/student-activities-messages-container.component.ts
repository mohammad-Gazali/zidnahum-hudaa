import { Component, computed, inject, input } from '@angular/core';
import {
  MemoPipe,
  MemorizeMessageForStudent,
  MessageTypeEnum,
  TestPipe,
} from '@shared';
import { MatCard } from '@angular/material/card';
import { PagesSumService } from '@client/services';

@Component({
  selector: 'app-student-activities-messages-container',
  imports: [MatCard, MemoPipe, TestPipe],
  templateUrl: './student-activities-messages-container.component.html',
  styleUrl: './student-activities-messages-container.component.scss',
})
export class StudentActivitiesMessagesContainerComponent {
  private sumPages = inject(PagesSumService);
  public messages = input.required<MemorizeMessageForStudent[]>();

  protected messageType = MessageTypeEnum;
  protected sumValue = computed(() =>
    this.sumPages.getMessagesPagesSum(this.messages()),
  );
}
