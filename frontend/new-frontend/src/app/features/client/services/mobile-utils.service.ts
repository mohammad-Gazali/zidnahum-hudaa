import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MobileUtilsService {
    public hideMobileKeyboard() {
        // hide via focusing an input
        const field = document.createElement('input');
        document.body.appendChild(field);

        setTimeout(() => {
            field.focus();
            setTimeout(() => field.remove(), 50);
        }, 50);
    }
}
