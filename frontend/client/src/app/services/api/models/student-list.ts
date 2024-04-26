/* tslint:disable */
import { StudentCategory } from './student-category';
import { StudentGroup } from './student-group';
export interface StudentList {
  birthdate?: null | string;
  category?: StudentCategory;
  group?: StudentGroup;
  id: number;
  masjed: 1 | 2 | 3;
  mother_name?: null | string;
  name: string;
  parts_received?: null | string;
}
