import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from "../../pipes/translate.pipe";

@Component({
    selector: 'app-footer',
    standalone: true,
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [TranslatePipe]
})
export class FooterComponent {
  copyRight = 'all rights reserved &copy; zidnhaum hudaa 2023 - 2024'
}
