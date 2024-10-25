import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MobileUtilsService {
    public hideMobileKeyboard() {
        // check if browser has virtual keyboard api support
        if ('virtualKeyboard' in navigator) {
            (navigator.virtualKeyboard as any)?.hide?.();
            return;
        }
        
        // hide via focusing an input
        const field = document.createElement('input');
        document.body.appendChild(field);

        setTimeout(() => {
            field.focus();
            setTimeout(() => field.remove(), 50);
        }, 50);
    }
}
