import { EMPTY, Observable, catchError } from 'rxjs';
import { TableAction } from '../shared/table/table.component.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { SnackbarService } from '../services/snackbar.service';

export const deleteModelAction = (
  model: string,
  delegateFunc: (ids: number[]) => Observable<any>
): TableAction => {
  const snackbar = inject(SnackbarService);

  return {
    name: 'delete',
    confirmation: {
      message: `هل أنت متأكد من حذف ${model} ؟`,
    },
    delegateFunc: (ids) =>
      delegateFunc(ids).pipe(
        catchError((err: HttpErrorResponse) => {
          if ('detail' in err.error) {
            snackbar.error(err.error.detail);
          }
          return EMPTY;
        })
      ),
  };
};
