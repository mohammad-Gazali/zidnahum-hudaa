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

  public routes: LayoutRoute[] = [
    {
      link: '/news',
      name: 'الإعلانات',
      icon: 'notifications',
    },
    {
      link: '/files',
      name: 'الملفات',
      icon: 'file_copy',
    },
    {
      link: '/reports',
      name: 'التقارير',
      icon: 'assessment',
      authOnly: true,
      groups: [Group.Reports],
    },
    {
      link: '',
      name: 'نشاطاتي',
      icon: 'widgets',
      authOnly: true,
      routes: [
        {
          link: '/log-memo',
          icon: 'book',
          name: 'سجل التسميع',
          groups: [Group.Memo],
        },
        {
          link: '/log-coming',
          icon: 'checklist',
          name: 'سجل الحضور',
          groups: [Group.Coming],
        },
        {
          link: '/log-points',
          icon: 'stars',
          name: 'سجل النقاط',
          groups: [Group.Points],
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
  routes?: LayoutRoute[];
  groups?: Group[];
}
