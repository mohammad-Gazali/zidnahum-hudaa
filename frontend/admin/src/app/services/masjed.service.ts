import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MasjedService {
  getMasjeds() {
    return of([
      {
        id: 1,
        name: 'الحسنين',
      },
      {
        id: 2,
        name: 'السلام',
      },
      {
        id: 3,
        name: 'القزاز',
      },
    ]);
  }
}
