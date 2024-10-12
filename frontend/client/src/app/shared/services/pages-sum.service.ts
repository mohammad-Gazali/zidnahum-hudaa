import { Injectable } from '@angular/core';
import { MemorizeMessageForStudent } from './api/models';
import { MessageType } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class PagesSumService {
  public getMessagesPagesSum(messages: MemorizeMessageForStudent[]) {
    return Math.ceil(
        messages
        .filter(message => message.message_type === MessageType.Memo || message.message_type === MessageType.Test)
        .map(message => message.message_type === MessageType.Memo
            ? this.getNumPagesMemo(message.changes)
            : this.getNumPagesTest(message.changes)
        )
        .reduce((pre, curr) => pre + curr, 0)
    )
  }

  private getNumPagesMemo(changes: number[]) {
    return changes
      .map((item) => 0 <= item && item <= 580
          ? 1
          : (this.LAST_PART_POINT_MAP.get(item) ?? 0) / 5
      )
      .reduce((pre, curr) => pre + curr, 0);
  }

  private getNumPagesTest(changes: number[]) {
    return changes.length * 2.5;
  }

  private LAST_PART_POINT_MAP = new Map([
    [581, 7],
    [582, 8],
    [583, 5],
    [584, 5],
    [585, 4],
    [586, 6],
    [587, 5],
    [588, 5],
    [589, 3],
    [590, 3],
    [591, 4],
    [592, 6],
    [593, 4],
    [594, 3],
    [595, 4],
    [596, 2],
    [597, 1],
    [598, 2],
    [599, 3],
    [600, 1],
    [601, 5],
    [602, 3],
    [603, 2],
    [604, 3],
    [605, 2],
    [606, 1],
    [607, 2],
    [608, 2],
    [609, 1],
    [610, 3],
    [611, 1],
    [612, 2],
    [613, 1],
    [614, 2],
    [615, 1],
    [616, 2],
    [617, 2],
  ]);
}
