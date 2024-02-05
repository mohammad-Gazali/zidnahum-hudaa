import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TableComponent } from '../../../../shared/table/table.component';
import { Student } from '../../../../services/api/admin/models';
import { StudentsService } from '../../../../services/api/admin/services';
import { Observable } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { TranslatePipe } from '../../../../pipes/translate.pipe';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, TranslatePipe],
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentComponent extends TableComponent<Student> {
  private students = inject(StudentsService);

  protected override columns: (keyof Student)[] = [
    'id',
    'name',
    'mother_name',
    'category',
    'group',
    'registered_at',
  ];
  protected override data$: Observable<{
    count: number;
    next?: string | null | undefined;
    previous?: string | null | undefined;
    results: Student[];
  }> = this.students.studentsStudentList({});
}
