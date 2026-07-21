export { ReportsStudentResponse } from './reports-student-response';

export interface ReportsRequestWithMasjed {
  end_date: string;
  masjed: 1 | 2 | 3 | 4;
  start_date: string;
}

export interface ReportsRequest {
  end_date: string;
  start_date: string;
}

export interface ReportsStudentCategoryOrGroupResponse {
  students: Array<ReportsStudentCategoryOrGroupStudent>;
  total: number;
  total_memo: number;
  total_test: number;
  total_viewing: number;
  total_elite_test: number;
  total_extra_hadeeth: number;
}

export interface ReportsStudentCategoryOrGroupStudent {
  student_id: number;
  student_name: string;
  sum_all: number;
  sum_memo: number;
  sum_test: number;
  sum_viewing: number;
  sum_elite_test: number;
  sum_extra_hadeeth: number;
}

export interface ReportMemorizeMessage {
  changes: number[];
  id: number;
  is_doubled: boolean;
  master: null | number;
  message_type: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  sended_at: string;
}

export interface ReportsAllCategoriesResponseItem extends ReportsStudentCategoryOrGroupResponse {
  category_id: number;
  category_name: string;
}

export interface ReportsAllGroupsResponseItem extends ReportsStudentCategoryOrGroupResponse {
  group_id: number;
  group_name: string;
}
