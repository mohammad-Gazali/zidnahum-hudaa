import { Component, effect, inject, signal, viewChild, } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { SidenavComponent } from './sidenav/sidenav.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AccountsService } from '../services/api/accounts/accounts.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  imports: [
    NavbarComponent,
    SidenavComponent,
    MatSidenavContainer,
    MatSidenavContent,
    MatSidenav,
  ],
})
export class LayoutComponent {
  public breakpointObserver = inject(BreakpointObserver);
  private userDetails = inject(AccountsService).details;

  public open = signal(true);
  public mode = signal<'over' | 'side'>('side');

  public sidenav = viewChild.required(MatSidenav);

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
          this.mode.set('over');
        } else {
          this.mode.set('side');
        }
      });

    effect(() => {
      const details = this.userDetails();

      if (!details) {
        this.sidenav().close();

      } else {
        const sidenav = this.sidenav();
        const sidenavState = localStorage.getItem('zidnahum-sidenav') ?? 'close';

        sidenav.opened = sidenavState === 'open';
      }
    });
  }

  handleSidenavChange(opened: boolean) {
    localStorage.setItem('zidnahum-sidenav', opened ? 'open' : 'close');
  }

  handleSidenavItemClick() {
    if (this.mode() === 'over') this.sidenav().close();
  }
}
