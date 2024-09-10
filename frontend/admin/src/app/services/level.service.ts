import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LevelService {
  getLevels() {
    return of([
      {
        id: 1,
        name: 'مستوى أول',
      },
      {
        id: 2,
        name: 'مستوى ثاني',
      },
      {
        id: 3,
        name: 'مستوى ثالث',
      },
    ]);
  }
}
