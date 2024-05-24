import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { CanActivateFn, Router } from '@angular/router';
import { filter, map, tap } from 'rxjs';
import { AuthService } from '@shared';

export const groupGuard: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const groups = route.data as any[];

  return toObservable(auth.currentUser).pipe(
    filter((user) => user !== undefined),
    map((user) => user?.isAdmin || user?.groups.some(g => groups.indexOf(g) !== -1)),
    map(Boolean),
    tap((res) => {
      if (!res) {
        router.navigateByUrl('/');
      }
    }),
  );
};
