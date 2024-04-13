export interface ReportsRequestWithMasjed {
  end_date: string;
  masjed: 1 | 2 | 3;
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
}

export interface ReportsStudentCategoryOrGroupStudent {
  student_id: number;
  student_name: string;
  sum_all: number;
  sum_memo: number;
  sum_test: number;
}

export interface ReportsStudentResponse {
  messages: Array<ReportMemorizeMessage>;
  sum_all: number;
  sum_memo: number;
  sum_test: number;
}

export interface ReportMemorizeMessage {
  changes: number[];
  id: number;
  is_doubled: boolean;
  master: null | number;
  message_type: 1 | 2 | 3 | 4 | 5;
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