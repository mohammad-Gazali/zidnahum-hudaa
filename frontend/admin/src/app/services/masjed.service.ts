import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MasjedService {
  getMasjed(id: 1 | 2 | 3): string {
    switch (id) {
      case 1: return 'الحسنين';
      case 2: return 'السلام';
      case 3: return 'القزاز';
    }
  }

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
