import { Injectable } from "@angular/core";
import { of } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class MemorizeMessageTypeService {
    getTypes() {
        return of([
          {
            id: 1,
            name: 'تسميع',
          },
          {
            id: 2,
            name: 'سبر',
          },
          {
            id: 3,
            name: 'أربعين نووية',
          },
          {
            id: 4,
            name: 'رياض الصالحين',
          },
          {
            id: 5,
            name: 'أسماء الله الحسنى',
          }
        ]);
    }
}