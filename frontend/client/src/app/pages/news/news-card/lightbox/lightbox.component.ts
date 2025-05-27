import { DIALOG_DATA } from "@angular/cdk/dialog";
import { Component, inject } from "@angular/core";

@Component({
  selector: 'app-lightbox',
  standalone: true,
  template: `
    <img [alt]="data.alt" [src]="data.src" />
  `,
  styles: `
    img {
      max-width: 100%;
      max-height: 80vh;
      border-radius: 8px;
      margin: auto;
      animation: fade 300ms;
    }

    img:focus {
      outline: none;
    }

    @keyframes fade {
      from {
        opacity: 0;
      }

      to {
        opacity: 1;
      }
    }
  `,
})
export class LightboxComponent {
  protected data = inject<{
    alt: string;
    src: string;
  }>(DIALOG_DATA);
}