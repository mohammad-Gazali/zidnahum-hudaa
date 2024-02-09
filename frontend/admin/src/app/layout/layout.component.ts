import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { SidenavComponent } from './sidenav/sidenav.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject, takeUntil } from 'rxjs';

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
export class LayoutComponent implements OnDestroy, AfterViewInit {
  public breakpointObserver = inject(BreakpointObserver);

  public open = signal(true);
  public mode = signal<"over" | "side">("side");
  private destroyed$ = new Subject<void>();

  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  constructor() {
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
      ])
      .pipe(takeUntil(this.destroyed$))
      .subscribe((result) => {
        if (result.matches) {
          this.mode.set("over");
        } else {
          this.mode.set("side");
        }
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  ngAfterViewInit(): void {
    const sidenavState = localStorage.getItem('sidenav') ?? 'close';

    this.sidenav.opened = sidenavState === 'open';
  }

  hanldeSidenavChange(opened: boolean) {
    localStorage.setItem('sidenav', opened ? 'open' : 'close');
  }
}
