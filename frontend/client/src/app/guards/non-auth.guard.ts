import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { CanActivateFn, Router } from '@angular/router';
import { filter, map, tap } from 'rxjs';
import { AuthService } from '@shared';

export const nonAuthGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return toObservable(auth.currentUser).pipe(
    filter((user) => user !== undefined),
    map((user) => user === null),
    tap((res) => {
      if (!res) {
        router.navigateByUrl('/');
      }
    })
  );
};
