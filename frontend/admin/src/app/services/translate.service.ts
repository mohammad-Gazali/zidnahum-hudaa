import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class TranslateService {
    translateMap = new Map<string, string>();

    constructor () {
        this.translateMap.set('zidnahum hudaa dashboard', 'لوحة تحكم وزدناهم هدى');
        this.translateMap.set('zidnahum hudaa', 'وزدناهم هدى');
        this.translateMap.set('warning', 'تحذير');
        this.translateMap.set('are you sure you want to delete this', 'هل أنت متأكد من حذف');
        this.translateMap.set('?', '؟');
        this.translateMap.set('yes', 'نعم');
        this.translateMap.set('total count', 'العدد الكلي');

        // ====== global forms ======
        this.translateMap.set('update', 'تعديل');
        this.translateMap.set('delete', 'حذف');
        this.translateMap.set('create', 'إضافة');

        // ====== login form ======
        this.translateMap.set('username', 'اسم المستخدم');
        this.translateMap.set('password', 'كلمة المرور');
        this.translateMap.set('login', 'تسجيل دخول');
        this.translateMap.set('logout', 'تسجيل خروج');
        this.translateMap.set('no active account found with the given credentials', 'لا يوجد حساب بهذه التفاصيل');

        // ====== form errors ======
        this.translateMap.set('this field is required', 'هذا الحقل مطلوب');
        this.translateMap.set('the maximum value is', 'القيمة العظمى هي');
        this.translateMap.set('the minimum value is', 'القيمة الصغرى هي');

        // ====== paginator ======
        this.translateMap.set('next page', 'الصفحة التالية');
        this.translateMap.set('previous page', 'الصفحة السابقة');
        this.translateMap.set('items per page', 'عدد العناصر في الصفحة');
        this.translateMap.set('first page', 'الصفحة الأولى');
        this.translateMap.set('last page', 'الصفحة الأخيرة');
        this.translateMap.set('page', 'صفحة');
        this.translateMap.set('of', 'من');

        // ====== filters ======
        // "search" | "select" | "select_null" | "date" | "date_range"
        this.translateMap.set('filters', 'المحددات');
        this.translateMap.set('actions', 'الإجراءات');
        this.translateMap.set('search', 'بحث');
        this.translateMap.set('select', 'اختيار');
        this.translateMap.set('select_null', 'اختيار');
        this.translateMap.set('date', 'تاريخ');
        this.translateMap.set('date_range', 'مدة زمنية');
        this.translateMap.set('empty value', 'قيمة فارغة');
        this.translateMap.set('cancel', 'تراجع');
        this.translateMap.set('perform filters', 'إجراء المحددات');
        this.translateMap.set('specific date', 'تاريخ محدد');
        this.translateMap.set('date range', 'فترة زمنية');
        this.translateMap.set('start date', 'تاريخ البداية');
        this.translateMap.set('end date', 'تاريخ النهاية');

        // ====== students group ======
        // student model
        this.translateMap.set('students', 'الطلاب');
        this.translateMap.set('student', 'الطالب');
        this.translateMap.set('id', 'المعرف');
        this.translateMap.set('name', 'الاسم');
        this.translateMap.set('mother_name', 'اسم الأم');
        this.translateMap.set('birthdate', 'تاريخ الميلاد');
        this.translateMap.set('category', 'الفئة');
        this.translateMap.set('group', 'المجموعة');
        this.translateMap.set('masjed', 'المسجد');
        this.translateMap.set('address', 'العنوان تفصيلاً');
        this.translateMap.set('static_phone', 'الهاتف الأرضي');
        this.translateMap.set('cell_phone', 'الجوال');
        this.translateMap.set('father_phone', 'جوال الأب');
        this.translateMap.set('mother_phone', 'جوال الأم');
        this.translateMap.set('registered_at', 'تاريخ التسجيل');
        this.translateMap.set('father_work', 'عمل الأب');
        this.translateMap.set('notes', 'ملاحظات');
        this.translateMap.set('bring_him', 'أحضره');
        this.translateMap.set('parts_received', 'الأجزاء المستلمة');
        this.translateMap.set('q_memorizing', 'حفظ القرآن');
        this.translateMap.set('q_test', 'السبر في المسجد');
        this.translateMap.set('q_awqaf_test', 'سبر القرآن في الأوقاف غيباً');
        this.translateMap.set('q_awqaf_test_looking', 'سبر القرآن في الأوقاف نظراً');
        this.translateMap.set('q_awqaf_test_explaining', 'سبر القرآن في الأوقاف تفسيراً');
        this.translateMap.set('alarbaein_alnawawia_old', 'الأربعين النووية قديم');
        this.translateMap.set('alarbaein_alnawawia_new', 'الأربعين النووية جديد');
        this.translateMap.set('riad_alsaalihin_old', 'رياض الصالحين قديم');
        this.translateMap.set('riad_alsaalihin_new', 'رياض الصالحين جديد');
        this.translateMap.set('allah_names_old', 'أسماء الله الحسنى قديم');
        this.translateMap.set('allah_names_new', 'أسماء الله الحسنى جديد');

        // student category model
        this.translateMap.set('student-category', 'فئة الطالب');

        // student group model
        this.translateMap.set('student-group', 'مجموعة الطالب');

        // user model
        this.translateMap.set('user', 'مستخدم');
        this.translateMap.set('first_name', 'الاسم');
        this.translateMap.set('last_name', 'الكنية');
        this.translateMap.set('is_active', 'فعال');
        this.translateMap.set('is_staff', 'طاقم');
        this.translateMap.set('is_superuser', 'مستخدم فائق');
        this.translateMap.set('groups', 'المجموعات');
        this.translateMap.set('new password', 'كلمة المرور الجديدة');
        this.translateMap.set('reset password', 'تغيير كلمة المرور');

        // points adding model
        this.translateMap.set('master', 'الأستاذ');
        this.translateMap.set('created_at', 'تاريخ الإنشاء');
        this.translateMap.set('student_name', 'اسم الطالب');
        this.translateMap.set('value', 'القيمة');
        this.translateMap.set('cause', 'السبب');
    }

    translate(value: string): string {
        return this.translateMap.get(value.toLowerCase()) ?? 'INVALID TRANSLATION';
    }
}