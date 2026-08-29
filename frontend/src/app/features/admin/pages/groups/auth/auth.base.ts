import { inject } from '@angular/core';
import {
  ActionsService,
  UsersGroupsService,
} from '@shared';

export abstract class AuthBase {
  protected auth = inject(UsersGroupsService);
  protected actions = inject(ActionsService);
}
