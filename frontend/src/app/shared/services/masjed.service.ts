import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { MasjedEnum } from './api/models';
import { MASJED_LABELS } from '../constants/labels.const';

@Injectable({
  providedIn: 'root',
})
export class MasjedService {
  public readonly masjedOptions = Object.values(MasjedEnum).filter(
    (v): v is MasjedEnum => typeof v === 'number',
  );

  getMasjed(id: MasjedEnum): string {
    return MASJED_LABELS[id];
  }

  getMasjeds() {
    return of(
      this.masjedOptions.map((id) => ({ id, name: MASJED_LABELS[id] })),
    );
  }
}