import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable, inject, signal } from '@angular/core';
import { map, shareReplay } from 'rxjs';
import { Group } from '../constants/group.enum';

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
      authOnly: true,
    },
    {
      link: '',
      name: 'الإضافات',
      icon: 'add',
      authOnly: true,
      routes: [
        {
          link: '/add-memo',
          name: 'إضافة تسميع',
          icon: 'book',
          groups: [Group.Memo],
        },
        {
          link: '/add-coming',
          name: 'إضافة حضور',
          icon: 'edit_calendar',
          groups: [Group.Coming],
        },
        {
          link: '/add-points',
          name: 'إضافة نقاط',
          icon: 'add_circle_outline',
          groups: [Group.Points],
        },
      ],
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

export interface LayoutRoute {
  name: string;
  link: string;
  icon: string;
  nonAuthOnly?: boolean;
  authOnly?: boolean;
  routes?: LayoutRoute[];
  groups?: Group[];
}
