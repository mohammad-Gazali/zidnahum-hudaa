import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { EXTRA_HADEETH_LABEL } from "../constants";

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
          },
          {
            id: 6,
            name: 'سبر أحزاب'
          },
          {
            id: 7,
            name: 'قراءة القرآن نظراً'
          },
          {
            id: 8,
            name: EXTRA_HADEETH_LABEL,
          }
        ]);
    }
}
