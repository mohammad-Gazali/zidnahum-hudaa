/* tslint:disable */
export interface UserList {
  first_name?: string;
  id: number;

  /**
   * يحدد ما إذا كان المستخدم سيُعامل على أنّه نشط. أزل تحديد هذا الحقل بدلاً من حذف الحسابات.
   */
  is_active?: boolean;

  /**
   * يحدد ما إذا كان يمكن للمستخدم الدخول إلى موقع الإدارة هذا.
   */
  is_staff?: boolean;

  /**
   * يقضي بأن هذا المستخدم يمتلك كافة الصلاحيات دون الحاجة لمنحها له تصريحاً.
   */
  is_superuser?: boolean;
  last_name?: string;

  /**
   * مطلوب. 150 رمزاً أو أقل، مكونة من حروف وأرقام و @/./+/-/_ فقط
   */
  username: string;
}
