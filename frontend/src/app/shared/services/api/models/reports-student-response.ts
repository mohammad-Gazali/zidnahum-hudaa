/* tslint:disable */
import { ReportMemorizeMessage } from './report-memorize-message';
export interface ReportsStudentResponse {
  messages: Array<ReportMemorizeMessage>;
  sum_all: number;
  sum_memo: number;
  sum_test: number;
  sum_viewing: number;
  sum_elite_test: number;
  sum_extra_hadeeth: number;
}
