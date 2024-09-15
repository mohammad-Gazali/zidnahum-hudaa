import { Component, inject } from '@angular/core';
import { AssetCategory, GlobalsService } from '@shared';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatAnchor } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';

@Component({
  selector: 'app-files',
  standalone: true,
  imports: [
    MatAnchor,
    MatCard,
    MatCardContent
  ],
  templateUrl: './files.component.html',
  styleUrl: './files.component.scss'
})
export class FilesComponent {
  private globals = inject(GlobalsService);

  protected categories = toSignal<AssetCategory[]>(this.globals.globalsAssetList(), {
    initialValue: [] as any,
  });
}
