import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { MESSAGE_TYPE_LABELS, MessageTypeEnum } from '@shared';

@Injectable({
  providedIn: 'root',
})
export class MemorizeMessageTypeService {
  getTypes() {
    return of(
      Object.values(MessageTypeEnum)
        .filter((v): v is MessageTypeEnum => typeof v === 'number')
        .map((id) => ({ id, name: MESSAGE_TYPE_LABELS[id] })),
    );
  }
}