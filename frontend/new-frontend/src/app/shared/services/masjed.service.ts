import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MasjedService {
  public masjedOptions = [1, 2, 3, 4] as const;

  getMasjed(id: 1 | 2 | 3 | 4): string {
    switch (id) {
      case 1: return 'الحسنين';
      case 2: return 'السلام';
      case 3: return 'القزاز';
      case 4: return 'الخنساء';
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
      {
        id: 4,
        name: 'الخنساء',
      },
    ]);
  }
}
