import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GroupsService {
  public readonly groups: Group[] = [
    {
      name: 'المصادقة والتفويض',
      icon: 'vpn_key',
      superAdmin: true,
      items: [
        { name: 'المستخدمون', link: '/auth/user', icon: 'person' },
        { name: 'المجموعات', link: '/auth/group', icon: 'group' },
      ],
    },
    {
      name: 'الأوقاف',
      icon: 'account_balance',
      items: [
        { name: 'اختبارات الأوقاف بغير القرآن', link: '/awqaf/no-q-test', icon: 'quiz' },
        {
          name: 'سبر الطلاب للأوقاف بغير القرآن',
          link: '/awqaf/student-no-q-test-relation',
          icon: 'call_merge',
        },
        {
          name: 'إضافة سبر الأوقاف للطلاب',
          link: '/awqaf/add-awqaf-test-student',
          icon: 'playlist_add',
        }
      ],
    },
    {
      name: 'الحضور',
      icon: 'edit_calendar',
      items: [
        { name: 'أسباب الحضور', link: '/comings/coming-category', icon: 'category' },
        { name: 'تسجيلات الحضور', link: '/comings/coming', icon: 'edit_calendar' },
      ],
    },
    {
      name: 'عموميات',
      icon: 'extension',
      items: [
        { name: 'فئات الملفات', link: '/globals/assets-category', icon: 'extension' },
        { name: 'الملفات', link: '/globals/assets-file', icon: 'insert_drive_file' },
        { name: 'الإعلانات', link: '/globals/news', icon: 'notifications' }
      ],
    },
    {
      name: 'الغرامات المالية',
      icon: 'payments',
      superAdmin: true,
      items: [
        { name: 'أسباب الغرامة', link: '/money/money-deleting-cause', icon: 'paid' },
        { name: 'الغرامات', link: '/money/money-deleting', icon: 'payments' },
        { name: 'الغرامات الكلية', link: '/money/money-total', icon: 'payments' },
        { name: 'إضافة غرامة', link: '/money/add-money-deleting', icon: 'money_off' }
      ],
    },
    {
      name: 'النقاط المتفرقة',
      icon: 'rule',
      items: [
        { name: 'أسباب الإضافة', link: '/points/adding-cause', icon: 'add_task' },
        { name: 'الإضافات', link: '/points/adding', icon: 'add_circle_outline' },
        { name: 'أسباب الخصم', link: '/points/deleting-cause', icon: 'remove_done', superAdmin: true },
        { name: 'الخصومات', link: '/points/deleting', icon: 'remove_circle_outline', superAdmin: true },
      ],
    },
    {
      name: 'الطلاب',
      icon: 'school',
      items: [
        { name: 'الطلاب', link: '/students/student', icon: 'school' },
        { name: 'فئات الطلاب', link: '/students/student-category', icon: 'class' },
        { name: 'مجموعات الطلاب', link: '/students/student-group', icon: 'groups' },
        { name: 'رسائل التسميع', link: '/students/memorize-message', icon: 'email' },
        { name: 'ملاحظات التسميع', link: '/students/memorize-notes', icon: 'notes' },
        { name: 'إضافة سبر أحزاب للطلاب', link: '/students/add-elite-test', icon: 'star' },
      ],
    },
    {
      name: 'الإدارة',
      icon: 'settings',
      items: [
        { name: 'إعدادات الموقع', link: '/admin/settings', icon: 'settings', superAdmin: true },
        { name: 'التقارير', link: '/admin/reports', icon: 'assessment' },
        { name: 'الإحصائيات', link: '/admin/statistics', icon: 'query_stats', superAdmin: true },
      ],
    },
  ];
}

export interface Group {
  name: string;
  icon: string;
  superAdmin?: boolean;
  items: {
    name: string;
    link: string;
    icon: string;
    superAdmin?: boolean;
  }[];
}
