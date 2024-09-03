import { inject, Injectable, signal } from '@angular/core';
import { StudentList } from '@shared';
import { NonNullableFormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class HomeStudentListService {
  private fb = inject(NonNullableFormBuilder);

  public searchForm = this.fb.group({
    search: this.fb.control(''),
  });
  public lastResponse = signal<
    | {
    count: number;
    next?: string | null | undefined;
    previous?: string | null | undefined;
    results: StudentList[];
  }
    | undefined
  >(undefined);
}
