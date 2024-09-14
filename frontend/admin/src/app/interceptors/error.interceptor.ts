import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, of } from 'rxjs';
import { SnackbarService } from '../services/snackbar.service';
import { LOADING } from '../tokens/loading.token';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackbar = inject(SnackbarService);
  const loading = inject(LOADING);

  if (req.url.endsWith('accounts/details')) return next(req);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if ('detail' in err.error) {
        snackbar.error(err.error.detail);
        loading.set(false);
      }
      return of(err as any);
    })
  );
};
