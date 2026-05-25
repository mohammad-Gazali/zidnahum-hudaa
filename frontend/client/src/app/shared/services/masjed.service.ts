import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MasjedService {
  public masjedOptions = [1, 2, 3, 4] as const;
}
