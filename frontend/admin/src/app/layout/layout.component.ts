import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  inject,
  signal,
} from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavComponent } from './sidenav/sidenav.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-layout',
  standalone: true,
  templateUrl: './layout.component.html',
  styleUrl: `./layout.component.scss`,
  imports: [
    NavbarComponent,
    FooterComponent,
    SidenavComponent,
    MatSidenavModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnDestroy {
  public breakpointObserver = inject(BreakpointObserver);

  public open = signal(true);
  public mode = signal<"over" | "side">("side");
  private subscription: Subscription;

  constructor() {
    this.subscription = this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
      ])
      .subscribe((result) => {
        if (result.matches) {
          this.mode.set("over");
        } else {
          this.mode.set("side");
        }
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
