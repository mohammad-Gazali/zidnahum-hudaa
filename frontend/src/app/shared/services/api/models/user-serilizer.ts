/* tslint:disable */
export interface UserSerilizer {
  first_name?: string;

  /**
   * المجموعات التي ينتمي إليها هذا المستخدم. يحصل المستخدم على كافة الصلاحيات الممنوحة لكل مجموعة ينتمي إليها.
   */
  groups?: Array<number>;
  id?: number;

  /**
   * يقضي بأن هذا المستخدم يمتلك كافة الصلاحيات دون الحاجة لمنحها له تصريحاً.
   */
  is_superuser?: boolean;

  /**
   * يقضي بأن هذا المستخدم يمتلك كافة الصلاحيات دون الحاجة لمنحها له تصريحاً.
   */
  is_staff?: boolean;

  last_name?: string;

  /**
   * مطلوب. 150 رمزاً أو أقل، مكونة من حروف وأرقام و @/./+/-/_ فقط
   */
  username: string;
}
