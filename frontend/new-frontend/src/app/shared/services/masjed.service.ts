import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Masjed } from '../types/masjed.enum';
import { MASJED_LABELS } from '../constants/labels.const';

@Injectable({
  providedIn: 'root',
})
export class MasjedService {
  public readonly masjedOptions = Object.values(Masjed).filter(
    (v): v is Masjed => typeof v === 'number',
  );

  getMasjed(id: Masjed): string {
    return MASJED_LABELS[id];
  }

  getMasjeds() {
    return of(
      this.masjedOptions.map((id) => ({ id, name: MASJED_LABELS[id] })),
    );
  }
}
