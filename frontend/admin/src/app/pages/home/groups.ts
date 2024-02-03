export const groups: Group[] = [
    {
        name: 'المصادقة والتفويض',
        icon: 'vpn_key',
        items: [
            {name: 'المستخدمون', link: '/auth/user'},
            {name: 'المجموعات', link: '/auth/group'},
        ],
    },
    {
        name: 'الأوقاف',
        icon: 'account_balance',
        items: [
            {name: 'اختبارات الأوقاف بغير القرآن', link: '/awqaf/no-q-test'},
            {name: 'سبر الطلاب للأوقاف بغير القرآن', link: '/awqaf/student-no-q-test-relation'},
        ]
    },
    {
        name: 'الحضور',
        icon: 'edit_calendar',
        items: [
            {name: 'أسباب الحضور', link: '/comings/coming-category'},
            {name: 'تسجيلات الحضور', link: '/comings/coming'},
        ],
    },
    {
        name: 'عموميات',
        icon: 'extension',
        items: [
            {name: 'فئات الملفات', link: '/globals/assets-category'},
            {name: 'الملفات', link: '/globals/assets-file'},
        ],
    },
    {
        name: 'الغرامات المالية',
        icon: 'payments',
        items: [
            {name: 'أسباب الغرامة', link: '/money/deleting-cause'},
            {name: 'الغرامات', link: '/money/deleting'},
        ],
    },
    {
        name: 'النقاط المتفرقة',
        icon: 'rule',
        items: [
            {name: 'أسباب الإضافة', link: '/points/adding-cause'},
            {name: 'الإضافات', link: '/points/adding'},
            {name: 'أسباب الخصم', link: '/points/deleting-cause'},
            {name: 'الخصومات', link: '/points/deleting'},
        ]
    },
    {
        name: 'الطلاب',
        icon: 'school',
        items: [
            {name: 'الطلاب', link: '/students/student'},
            {name: 'فئات الطلاب', link: '/students/student-category'},
            {name: 'مجموعات الطلاب', link: '/students/student-group'},
            {name: 'رسائل التسميع', link: '/students/memorize-message'},
            {name: 'ملاحظات التسميع', link: '/students/memorize-notes'},
        ]
    },
]

export interface Group {
    name: string;
    icon: string;
    items: {
        name: string;
        link: string;
    }[]
}