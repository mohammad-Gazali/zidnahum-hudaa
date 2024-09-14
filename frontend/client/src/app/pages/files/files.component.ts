import { Component, inject } from '@angular/core';
import { AssetCategory, GlobalsService } from '@shared';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatAnchor, MatButton } from '@angular/material/button';

@Component({
  selector: 'app-files',
  standalone: true,
  imports: [
    MatAnchor
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
