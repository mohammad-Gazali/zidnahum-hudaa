import { Group } from './group.enum';

export interface CurrentUser {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  groups: Group[];
  isAdmin: boolean;
  isSuperUser: boolean;
  isStaff: boolean;
}
