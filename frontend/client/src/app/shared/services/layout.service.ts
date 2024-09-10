import { BreakpointObserver } from '@angular/cdk/layout';
import { inject, Injectable, signal } from '@angular/core';
import { map, shareReplay } from 'rxjs';
import { Group } from '@shared';

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
      link: '/files',
      name: 'الملفات',
      icon: 'file_copy',
    },
    // TODO: admin route
    {
      link: '/admin',
      name: 'لوحة التحكم',
      icon: 'settings',
      adminOnly: true,
    },
    {
      link: '',
      name: 'نشاطاتي',
      icon: 'widgets',
      authOnly: true,
      routes: [
        {
          link: '/log-memo',
          icon: '',
          name: 'سجل التسميع'
        },
        {
          link: '/log-coming',
          icon: '',
          name: 'سجل الحضور'
        },
        {
          link: '/log-points',
          icon: '',
          name: 'سجل إضافة وخصم النقاط'
        },
      ],
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
        {
          link: '/add-hadeeth',
          name: 'إضافة حديث',
          icon: 'playlist_add',
          groups: [Group.Hadeeth],
        },
        {
          link: '/add-student',
          name: 'إضافة طالب',
          icon: 'person_add_alt_1',
          groups: [Group.AddStudents],
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
  adminOnly?: boolean;
  routes?: LayoutRoute[];
  groups?: Group[];
}
