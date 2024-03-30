import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { SidenavComponent } from './sidenav/sidenav.component';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  templateUrl: './layout.component.html',
  styleUrl: `./layout.component.scss`,
  imports: [
    NavbarComponent,
    SidenavComponent,
    MatSidenavContainer,
    MatSidenavContent,
    MatSidenav,
  ],
})
export class LayoutComponent implements AfterViewInit {
  public breakpointObserver = inject(BreakpointObserver);
  private cdr = inject(ChangeDetectorRef);

  public open = signal(true);
  public mode = signal<"over" | "side">("side");

  public sidenav = viewChild(MatSidenav);

  constructor() {
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
      ])
      .pipe(takeUntilDestroyed())
      .subscribe((result) => {
        if (result.matches) {
          this.mode.set("over");
        } else {
          this.mode.set("side");
        }
      });
  }

  ngAfterViewInit(): void {
    const sidenav = this.sidenav();
    const sidenavState = localStorage.getItem('sidenav') ?? 'close';

    if (sidenav) {
      sidenav.opened = sidenavState === 'open';
  
      this.cdr.detectChanges();
    }
  }

  hanldeSidenavChange(opened: boolean) {
    localStorage.setItem('sidenav', opened ? 'open' : 'close');
  }
}
