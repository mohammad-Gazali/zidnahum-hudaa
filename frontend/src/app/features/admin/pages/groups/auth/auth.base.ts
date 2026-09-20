import { inject } from '@angular/core';
import {
  AdminGroupService,
  AdminUserService,
} from '@shared';

export abstract class AuthBase {
  protected auth = inject(AdminUserService);
  protected groups = inject(AdminGroupService);
}
