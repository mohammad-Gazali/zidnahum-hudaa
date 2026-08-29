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
        { name: 'المستخدمون', link: '/admin/auth/user', icon: 'person' },
        { name: 'المجموعات', link: '/admin/auth/group', icon: 'group' },
      ],
    },
    {
      name: 'الأوقاف',
      icon: 'account_balance',
      items: [
        { name: 'اختبارات الأوقاف بغير القرآن', link: '/admin/awqaf/no-q-test', icon: 'quiz' },
        {
          name: 'سبر الطلاب للأوقاف بغير القرآن',
          link: '/admin/awqaf/student-no-q-test-relation',
          icon: 'call_merge',
        },
        {
          name: 'إضافة سبر الأوقاف للطلاب',
          link: '/admin/awqaf/add-awqaf-test-student',
          icon: 'playlist_add',
        }
      ],
    },
    {
      name: 'الحضور',
      icon: 'edit_calendar',
      items: [
        { name: 'أسباب الحضور', link: '/admin/comings/coming-category', icon: 'category' },
        { name: 'تسجيلات الحضور', link: '/admin/comings/coming', icon: 'edit_calendar' },
      ],
    },
    {
      name: 'عموميات',
      icon: 'extension',
      items: [
        { name: 'فئات الملفات', link: '/admin/globals/assets-category', icon: 'extension' },
        { name: 'الملفات', link: '/admin/globals/assets-file', icon: 'insert_drive_file' },
        { name: 'الإعلانات', link: '/admin/globals/news', icon: 'notifications' }
      ],
    },
    {
      name: 'الغرامات المالية',
      icon: 'payments',
      superAdmin: true,
      items: [
        { name: 'أسباب الغرامة', link: '/admin/money/money-deleting-cause', icon: 'paid' },
        { name: 'الغرامات', link: '/admin/money/money-deleting', icon: 'payments' },
        { name: 'الغرامات الكلية', link: '/admin/money/money-total', icon: 'payments' },
        { name: 'إضافة غرامة', link: '/admin/money/add-money-deleting', icon: 'money_off' }
      ],
    },
    {
      name: 'النقاط المتفرقة',
      icon: 'rule',
      items: [
        { name: 'أسباب الإضافة', link: '/admin/points/adding-cause', icon: 'add_task' },
        { name: 'الإضافات', link: '/admin/points/adding', icon: 'add_circle_outline' },
        { name: 'أسباب الخصم', link: '/admin/points/deleting-cause', icon: 'remove_done', superAdmin: true },
        { name: 'الخصومات', link: '/admin/points/deleting', icon: 'remove_circle_outline', superAdmin: true },
      ],
    },
    {
      name: 'الطلاب',
      icon: 'school',
      items: [
        { name: 'الطلاب', link: '/admin/students/student', icon: 'school' },
        { name: 'فئات الطلاب', link: '/admin/students/student-category', icon: 'class' },
        { name: 'مجموعات الطلاب', link: '/admin/students/student-group', icon: 'groups' },
        { name: 'رسائل التسميع', link: '/admin/students/memorize-message', icon: 'email' },
        { name: 'ملاحظات التسميع', link: '/admin/students/memorize-notes', icon: 'notes' },
        { name: 'إضافة سبر أحزاب للطلاب', link: '/admin/students/add-elite-test', icon: 'star' },
      ],
    },
    {
      name: 'الإدارة',
      icon: 'settings',
      items: [
        { name: 'إعدادات الموقع', link: '/admin/admin/settings', icon: 'settings', superAdmin: true },
        { name: 'التقارير', link: '/admin/admin/reports', icon: 'assessment' },
        { name: 'الإحصائيات', link: '/admin/admin/statistics', icon: 'query_stats', superAdmin: true },
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
