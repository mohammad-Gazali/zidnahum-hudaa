import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class TranslateService {
    translateMap = new Map<string, string>();

    constructor () {
        this.translateMap.set('zidnahum hudaa dashboard', 'لوحة تحكم وزدناهم هدى');
        this.translateMap.set('zidnahum hudaa', 'وزدناهم هدى');
        this.translateMap.set('all rights reserved &copy; zidnhaum hudaa 2023 - 2024', 'جميع الحقوق محفوظة &copy; وزدناهم هدى 2023 - 2024');

        this.translateMap.set('username', 'اسم المستخدم');
        this.translateMap.set('password', 'كلمة المرور');
        this.translateMap.set('login', 'تسجيل دخول');
        this.translateMap.set('logout', 'تسجيل خروج');
        this.translateMap.set('no active account found with the given credentials', 'لا يوجد حساب بهذه التفاصيل');

        this.translateMap.set('this field is required', 'هذا الحقل مطلوب');
    }

    translate(value: string): string {
        return this.translateMap.get(value.toLowerCase()) ?? 'INVALID TRANSLATION';
    }
}