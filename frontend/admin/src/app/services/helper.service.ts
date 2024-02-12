import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  snakeToCamel(str: string): string {
    return str
      .toLowerCase()
      .replace(/([_][a-z])/g, (group) => group.toUpperCase().replace('_', ''));
  }

  parseInt(value: string) {
    return Number(value);
  }
}
