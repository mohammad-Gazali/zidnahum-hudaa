import { Injectable } from "@angular/core";
import { Group } from "@shared";

@Injectable()
export class ClientRoutesService {
  public routes: ClientRoute[] = [
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
}

export interface ClientRoute {
  name: string;
  link: string;
  icon: string;
  nonAuthOnly?: boolean;
  authOnly?: boolean;
  routes?: ClientRoute[];
  groups?: Group[];
}
