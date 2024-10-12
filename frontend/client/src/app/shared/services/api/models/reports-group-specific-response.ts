/* tslint:disable */
import { ReportsStudentCategoryOrGroupStudent } from './reports-student-category-or-group-student';
export interface ReportsGroupSpecificResponse {
  group_id: number;
  group_name: string;
  students: Array<ReportsStudentCategoryOrGroupStudent>;
  total: number;
  total_memo: number;
  total_test: number;
}
