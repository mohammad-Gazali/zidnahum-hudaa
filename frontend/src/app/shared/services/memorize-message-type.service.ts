import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { MessageType } from '../enums';
import { MESSAGE_TYPE_LABELS } from '../constants/labels.const';

@Injectable({
  providedIn: 'root',
})
export class MemorizeMessageTypeService {
  getTypes() {
    return of(
      Object.values(MessageType)
        .filter((v): v is MessageType => typeof v === 'number')
        .map((id) => ({ id, name: MESSAGE_TYPE_LABELS[id] })),
    );
  }
}
