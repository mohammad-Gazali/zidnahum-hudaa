import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { of, type Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export abstract class TableComponent<T> implements OnInit, OnDestroy {
  protected dataSource = new MatTableDataSource<T>();
  @ViewChild(MatPaginator, { static: true }) private paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) private sort!: MatSort;

  protected columns: Extract<keyof T, string>[] = [];
  protected data$: Observable<{
    count: number;
    next?: null | string;
    previous?: null | string;
    results: Array<T>;
  }> = of({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });
  private subscription?: Subscription;

  ngOnInit(): void {
    this.subscription = this.data$.subscribe(({ results }) => {
      this.dataSource.data = results;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
