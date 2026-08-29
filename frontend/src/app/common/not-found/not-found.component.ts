import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
    <h1>404</h1>
    <p>الصفحة غير موجودة</p>
  `,
  styles: `
    :host {
      text-align: center;
      padding: 4rem;
    }
  `,
})
export class NotFoundComponent {}
