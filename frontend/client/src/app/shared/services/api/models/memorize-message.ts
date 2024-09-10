/* tslint:disable */
export interface MemorizeMessage {
  changes: number[];
  id: number;
  is_doubled: boolean;
  master?: null | number;
  message_type: 1 | 2 | 3 | 4 | 5;
  sended_at: string;
  student: string;
}
