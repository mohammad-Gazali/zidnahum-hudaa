import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable, inject, signal } from '@angular/core';
import { map, shareReplay } from 'rxjs';

@Injectable()
export class LayoutService {
  private breakpointObserver = inject(BreakpointObserver);  

  public isSmall$ = this.breakpointObserver.observe('(max-width: 1200px)').pipe(
    map((result) => result.matches),
    shareReplay()
  );

  private darkMode = signal(false);

  constructor() {
    const theme = localStorage.getItem('theme') ?? 'light';
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
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }

  public routes: LayoutRoute[] = [
    {
      link: '/',
      name: 'الصفحة الرئيسية',
      icon: 'home',
    },
    {
      link: '/news',
      name: 'الإعلانات',
      icon: 'notifications_active',
    },
    {
      link: '/files',
      name: 'الملفات',
      icon: 'file_copy',
    },
    {
      link: '/admin',
      name: 'لوحة التحكم',
      icon: 'settings',
    },
    {
      link: '/activities',
      name: 'نشاطاتي',
      icon: 'widgets',
    },
    {
      link: '/login',
      name: 'تسجيل الدخول',
      icon: 'person',
      nonAuthOnly: true,
    },
  ];

  public loading = signal(false);
}

interface LayoutRoute {
  name: string;
  link: string;
  icon: string;
  nonAuthOnly?: boolean;
  authOnly?: boolean;
}
