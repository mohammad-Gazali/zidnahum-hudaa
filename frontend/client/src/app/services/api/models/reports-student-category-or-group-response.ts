/* tslint:disable */
import { ReportsStudentCategoryOrGroupStudent } from './reports-student-category-or-group-student';
export interface ReportsStudentCategoryOrGroupResponse {
  students: Array<ReportsStudentCategoryOrGroupStudent>;
  total: number;
  total_memo: number;
  total_test: number;
}
