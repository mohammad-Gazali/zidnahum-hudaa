import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, LayoutComponent],
    template: `
    <app-layout>
      <router-outlet />
    </app-layout>`
})
export class AppComponent {
  constructor() {
    document.documentElement.addEventListener('keydown', (e) => {
      if (e.ctrlKey && (e.key === 'f' || e.key === 'ب')) {
        e.preventDefault();
        const el = document.querySelector('mat-form-field input');
        (el as HTMLInputElement)?.focus();
      }
    });
  }
}
