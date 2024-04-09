import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { finalize } from 'rxjs';
import { SnackbarService } from '../../../../services/snackbar.service';
import { TranslatePipe } from '../../../../pipes/translate.pipe';
import {
  AuthService,
  ReportsService,
  StudentsService,
} from '../../../../services/api/admin/services';
import { SearchStudent } from '../../../../shared/student-search/search-student.interface';
import { StudentSearchComponent } from '../../../../shared/student-search/student-search.component';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MasjedService } from '../../../../services/masjed.service';
import { LOADING } from '../../../../tokens/loading.token';
import { ReportsStudentCategoryOrGroupResponse, ReportsStudentResponse } from '../../../../services/api/admin/models';
import { MatTableModule } from '@angular/material/table';
import { MemorizeMessageTypeService } from '../../../../services/memorize-message-type.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatRadioModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    MatTableModule,
    StudentSearchComponent,
    TranslatePipe,
    DatePipe,
  ],
  providers: [
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'ar',
    },
    provideNativeDateAdapter(),
  ],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
})
export class ReportsComponent {
  private fb = inject(NonNullableFormBuilder);
  private reports = inject(ReportsService);
  private students = inject(StudentsService);
  private snackbar = inject(SnackbarService);
  private destroyRef = inject(DestroyRef);
  private masjed = inject(MasjedService);
  private auth = inject(AuthService);
  private messageType = inject(MemorizeMessageTypeService)
  public loading = inject(LOADING);

  public selectedStudent = signal<SearchStudent | null>(null);
  public categories = toSignal(this.students.studentsCategoryList());
  public groups = toSignal(this.students.studentsGroupList());
  public masjeds = toSignal(this.masjed.getMasjeds());
  private masters = toSignal(this.auth.authUserList());
  private messageTypes = toSignal(this.messageType.getTypes());

  public masterMap = computed(() => {
    const map = new Map<number | null | undefined, string>();

    map.set(null, '-')
    map.set(undefined, '-')

    this.masters()?.forEach(master => {
      map.set(master.id, master.first_name ?? '' + master.last_name ?? '')  
    })

    return map;
  })
  public messageTypeMap = computed(() => {
    const map = new Map<MessageType, string>();

    this.messageTypes()?.forEach(type => {
      map.set(type.id as MessageType, type.name);
    });

    return map;
  })

  public form = this.fb.group({
    masjed: this.fb.control<1 | 2 | 3 | undefined>(undefined),
    category: this.fb.control<number | undefined>(undefined),
    group: this.fb.control<number | undefined>(undefined),
    start_date: this.fb.control<Date | undefined>(undefined, [
      Validators.required,
    ]),
    end_date: this.fb.control<Date | undefined>(undefined, [
      Validators.required,
    ]),
  });

  public studentResponse = signal<ReportsStudentResponse | null>(null);
  public categoryOrGroupResponse = signal<ReportsStudentCategoryOrGroupResponse | null>(null);
  public type = this.fb.control<'student' | 'category' | 'group'>('student');

  constructor() {
    this.type.valueChanges.pipe(takeUntilDestroyed()).subscribe((value) => {
      switch (value) {
        case 'student':
          this.form.controls.masjed.clearValidators();
          this.form.controls.category.clearValidators();
          this.form.controls.group.clearValidators();
          this.form.controls.masjed.updateValueAndValidity();
          this.form.controls.category.updateValueAndValidity();
          this.form.controls.group.updateValueAndValidity();
          break;
        case 'category':
          this.form.controls.masjed.addValidators([Validators.required]);
          this.form.controls.category.addValidators([Validators.required]);
          this.form.controls.group.clearValidators();
          this.form.controls.group.updateValueAndValidity();
          break;
        case 'group':
          this.form.controls.masjed.addValidators([Validators.required]);
          this.form.controls.category.clearValidators();
          this.form.controls.category.updateValueAndValidity();
          this.form.controls.group.addValidators([Validators.required]);
          break;
      }
    });
  }

  public studentSubmit(excel?: boolean) {
    return this.reports
      .reportsStudentCreate({
        id: this.selectedStudent()!.id.toString(),
        data: this.getDurationData(),
        excel,
      })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.loading.set(false))
      );
  }

  public categorySubmit(excel?: boolean) {
    return this.reports
      .reportsCategoryCreate({
        id: this.form.value.category!.toString(),
        data: {
          ...this.getDurationData(),
          masjed: this.form.value.masjed!,
        },
        excel,
      })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.loading.set(false))
      );
  }

  public groupSubmit(excel?: boolean) {
    return this.reports
      .reportsGroupCreate({
        id: this.form.value.group!.toString(),
        data: {
          ...this.getDurationData(),
          masjed: this.form.value.masjed!,
        },
        excel,
      })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.loading.set(false))
      )
  }

  submit(excel?: boolean) {
    if (!this.form.valid || this.loading()) return;

    const student = this.selectedStudent();
    if (student === null && this.type.value === 'student') {
      this.snackbar.error('يجب اختيار الطالب قبل إنشاء التقرير');
      return;
    }

    this.loading.set(true);

    if (this.type.value === 'student') {
      this.studentSubmit(excel).subscribe((res) => this.studentResponse.set(res))

    } else if (this.type.value === 'category') {
      this.categorySubmit(excel).subscribe((res) => this.categoryOrGroupResponse.set(res))

    } else {
      this.groupSubmit(excel).subscribe((res) => this.categoryOrGroupResponse.set(res))
    }
  }

  public removeStudent() {
    this.selectedStudent.set(null);
  }

  private getDurationData() {
    return {
      start_date: this.form.value.start_date as any,
      end_date: this.form.value.end_date as any,
    };
  }
}

type MessageType = 1 | 2 | 3 | 4 | 5