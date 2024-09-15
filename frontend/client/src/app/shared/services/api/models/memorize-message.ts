/* tslint:disable */
export interface MemorizeMessage {
  changes: number[];
  id: number;
  masjed: 1 | 2 | 3;
  master?: null | number;
  message_type: 1 | 2 | 3 | 4 | 5;
  sended_at: string;
  student: string;
  student_level: 1 | 2 | 3;
}
