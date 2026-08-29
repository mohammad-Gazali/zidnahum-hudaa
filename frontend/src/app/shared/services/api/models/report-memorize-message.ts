/* tslint:disable */
export interface ReportMemorizeMessage {
  changes: number[];
  id: number;
  is_doubled: boolean;
  master: null | number;
  message_type: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  sended_at: string;
}
