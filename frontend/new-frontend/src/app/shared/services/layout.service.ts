import { BreakpointObserver } from '@angular/cdk/layout';
import { inject, Injectable, signal } from '@angular/core';
import { map, shareReplay } from 'rxjs';
import { Group } from '@shared';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private breakpointObserver = inject(BreakpointObserver);

  public isSmall$ = this.breakpointObserver.observe('(max-width: 1200px)').pipe(
    map((result) => result.matches),
    shareReplay()
  );

  private darkMode = signal(false);

  constructor() {
    const theme = localStorage.getItem('zidnahum-theme') ?? 'light';
    if (theme === 'dark') {
      this.darkMode.set(true);
    } else {
      this.darkMode.set(false);
    }
  }

  get isDarkMode() {
    return this.darkMode.asReadonly();
  }

  public toggleTheme() {
    this.setDarkMode(!this.darkMode());
  }

  private setDarkMode(isDarkMode: boolean) {
    this.darkMode.set(isDarkMode);

    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('zidnahum-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('zidnahum-theme', 'light');
    }
  }

  public loading = signal(false);
}
