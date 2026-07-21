import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  transform(index: number): string {
    const orderNumber = index + 1;
    const partOrderNumber = orderNumber % 4 === 0 ? 4 : orderNumber % 4;
    const partNumber = Math.ceil(orderNumber / 4);

    return `الربع ${partOrderNumber} من الحزب ${partNumber}`;
  }
}
