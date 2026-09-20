import { Dialog } from "@angular/cdk/dialog";
import { inject, Injectable } from "@angular/core";
import { LightboxComponent } from "./lightbox.component";

@Injectable({
  providedIn: 'root',
})
export class LightboxService {
  private dialog = inject(Dialog);

  public open(options: { src: string; alt: string }) {
    this.dialog.open(LightboxComponent, {
      data: options,
      autoFocus: 'img',
      backdropClass: 'lightbox-backdrop'
    });
  }
}