import { inject, Injectable, signal } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { StudentWithComingRegistrationList } from '@shared';

@Injectable({
  providedIn: 'root',
})
export class AddComingStudentListService {
  private fb = inject(NonNullableFormBuilder);

  public searchForm = this.fb.group({
    search: this.fb.control(''),
    categoryId: this.fb.control<undefined | number>(undefined, [Validators.required]),
    masjed: this.fb.control<1 | 2 | 3>(1),
  });
  public lastResponse = signal<
    | {
    count: number;
    next?: string | null | undefined;
    previous?: string | null | undefined;
    results: StudentWithComingRegistrationList[];
  }
    | undefined
  >(undefined);
}
