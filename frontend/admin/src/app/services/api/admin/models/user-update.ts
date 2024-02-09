/* tslint:disable */
export interface UserUpdate {
  date_joined?: string;
  email?: string;
  first_name?: string;

  /**
   * المجموعات التي ينتمي إليها هذا المستخدم. يحصل المستخدم على كافة الصلاحيات الممنوحة لكل مجموعة ينتمي إليها.
   */
  groups?: Array<number>;
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
  last_login?: null | string;
  last_name?: string;
  password: string;

  /**
   * صلاحيات خاصة بهذا المستخدم.
   */
  user_permissions?: Array<number>;

  /**
   * مطلوب. 150 رمزاً أو أقل، مكونة من حروف وأرقام و @/./+/-/_ فقط
   */
  username: string;
}
