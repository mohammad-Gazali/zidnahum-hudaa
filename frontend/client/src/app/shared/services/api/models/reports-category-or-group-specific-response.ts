/* tslint:disable */
import { ReportsStudentCategoryOrGroupStudent } from './reports-student-category-or-group-student';
export interface ReportsCategoryOrGroupSpecificResponse {
  category_id: number;
  category_name: string;
  students: Array<ReportsStudentCategoryOrGroupStudent>;
  total: number;
  total_memo: number;
  total_test: number;
}
