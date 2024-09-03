import { StudentCategory, StudentGroup } from '@shared';

export interface StudentWithComingRegistrationList {
  birthdate?: null | string;
  category?: StudentCategory;
  group?: StudentGroup;
  id: number;
  masjed: 1 | 2 | 3;
  mother_name?: null | string;
  name: string;
  is_registered_today: boolean;
}
