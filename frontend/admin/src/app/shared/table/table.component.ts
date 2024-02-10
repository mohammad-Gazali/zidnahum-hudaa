import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import {
  MatPaginator,
  MatPaginatorIntl,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import {
  TableComponentConfig,
  PaginationSortOptions,
  GetStringKeys,
  FieldConfig,
} from './table.component.config';
import { Subject, takeUntil } from 'rxjs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { TableComponentPaginator } from './table.component.paginator';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { LoadingService } from '../../services/loading.service';
import {
  DialogData,
  TableFiltersDialogComponent,
} from './table-filters-dialog/table-filters-dialog.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatChipsModule,
    MatIconModule,
    ReactiveFormsModule,
    RouterLink,
    TranslatePipe,
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: TableComponentPaginator }],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent<T> implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private loading = inject(LoadingService);
  private dialog = inject(MatDialog);

  public dataSource = new MatTableDataSource<T>([]);
  public selection = new SelectionModel<T>(true, []);
  public displayedColumns: ('check' | 'id' | GetStringKeys<Omit<T, 'id'>>)[] =
    [];
  public extraData: ExtraData = {};
  public searchForm = this.fb.nonNullable.group({
    searchValue: '',
  });
  public activeFilters = signal<Filter[]>([]);
  private destroyed$ = new Subject<void>();
  private pageSizeOptions = [20, 40, 100, 200];

  @Input({ required: true }) public config!: TableComponentConfig<T>;

  @ViewChild(MatPaginator, { static: true }) private paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) private sort!: MatSort;

  ngOnInit(): void {
    const keys = Object.keys(this.config.columns) as GetStringKeys<
      Omit<T, 'id'>
    >[];
    this.displayedColumns = ['check', 'id', ...keys];

    Object.entries<FieldConfig>(this.config.columns).forEach(
      ([name, config]) => {
        if (config.display === 'relation') {
          config
            .getFieldValueFunc()
            .pipe(takeUntil(this.destroyed$))
            .subscribe((res) => {
              this.extraData[name] = {
                data: res,
                map: this.convertDataToMap(res),
              };
            });
        }
      }
    );

    this.paginator.pageSize = 20;
    this.fetchData();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  onPageChange() {
    if (!this.config.hasPagination) return;

    this.fetchData(false, false);
  }

  onSortChange() {
    this.paginator.pageIndex = 0;

    this.fetchData(true, false);
  }

  private getPageSizeOptions(): number[] {
    // this index indicates the required index for getting the sutiable page
    // size options
    const targetIndex = this.pageSizeOptions.findIndex(
      (size) => size >= this.paginator.length
    );

    return targetIndex === -1
      ? this.pageSizeOptions
      : this.pageSizeOptions.slice(0, targetIndex);
  }

  private convertDataToMap(
    data: { id: number; name: string }[]
  ): Map<number, string> {
    const result = new Map<number, string>();

    data.forEach((item) => {
      result.set(item.id, item.name);
    });

    return result;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  addFilter(filter: Filter) {
    const existing = this.activeFilters().find((f) => filter.name === f.name);

    if (existing === undefined) {
      this.activeFilters.update((pre) => [...pre, filter]);
    } else {
      // for replacing the new one with the old
      this.activeFilters.update(pre => {
        const afterDelete = pre.filter(f => f !== existing);
        return [...afterDelete, filter]
      })
    }
  }

  removeFilter(index: number) {
    const newFilters = this.activeFilters().filter((_, i) => i !== index);
    this.activeFilters.set(newFilters);

    this.fetchData();
  }

  searchSubmit() {
    if (!this.config.searchField || !this.config.hasPagination) return;

    const searchValue = this.searchForm.value.searchValue;

    if (searchValue === undefined || searchValue === '') {
      this.activeFilters.update((pre) =>
        pre.filter((f) => f.type !== 'search')
      );

      this.fetchData();

      return;
    }

    const newFilter: Filter = {
      type: 'search',
      name: this.config.searchField,
      value: searchValue,
    };

    this.addFilter(newFilter);

    this.fetchData();

    this.searchForm.reset();
  }

  openFiltersDialog() {
    const ref = this.dialog.open<TableFiltersDialogComponent, DialogData>(
      TableFiltersDialogComponent,
      {
        width: '350px',
        data: {
          filters: Object.entries<FieldConfig>(this.config.columns)
            .filter(([_, config]) => {
              return config.filterType !== undefined;
            })
            .map(([name, config]) => ({
              name,
              type: config.filterType!,
            })),
          extraData: this.extraData,
        },
      }
    );

    const sub = ref.componentInstance.onSubmit
      .pipe(takeUntil(this.destroyed$))
      .subscribe((newFilters) => {
        newFilters.forEach((f) => this.addFilter(f));
        this.fetchData();
      });

    ref
      .afterClosed()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
        sub.unsubscribe();
      });
  }

  fetchData(resetPagination = true, resetSort = true) {
    const options = this.activeFiltersToOptions();

    if (!resetSort && this.sort.direction !== '') {
      const activeField = this.sort.active;
      options.ordering =
        this.sort.direction === 'asc' ? `${activeField}` : `-${activeField}`;
    }

    if (resetSort) {
      this.sort.direction = '';
    }

    this.loading.loading.set(true);

    if (this.config.hasPagination) {
      if (!resetPagination) {
        options.limit = this.paginator.pageSize;
        options.offset = this.paginator.pageIndex * this.paginator.pageSize;
      }

      this.config
        .dataFunc(options)
        .pipe(takeUntil(this.destroyed$))
        .subscribe((res) => {
          this.dataSource.data = res.results;

          this.paginator.length = res.count;
          this.paginator.pageSizeOptions = this.getPageSizeOptions();

          if (resetPagination) {
            this.paginator.pageIndex = 0;
          }

          this.selection = new SelectionModel<T>(true, []);
          this.loading.loading.set(false);
        });
    } else {
      this.config
        .dataFunc(options)
        .pipe(takeUntil(this.destroyed$))
        .subscribe((res) => {
          this.dataSource.data = res;
          this.selection = new SelectionModel<T>(true, []);
          this.loading.loading.set(false);
        });
    }
  }

  activeFiltersToOptions() {
    const result: any = {};

    this.activeFilters().forEach((filter) => {
      if (
        filter.type === 'search' ||
        filter.type === 'date' ||
        filter.type === 'select'
      ) {
        result[this.snakeToCamel(filter.name)] = filter.value;
      } else if (filter.type === 'select_null') {
        if (filter.value === '-1') {
          result[this.snakeToCamel(filter.name + '_isnull')] = 'True';
        } else {
          result[this.snakeToCamel(filter.name)] = filter.value;
        }
      } else if (filter.type === 'date_range') {
        const [startDate, endDate] = filter.value.split('=');

        result[this.snakeToCamel(filter.name + '_gt')] = startDate;
        result[this.snakeToCamel(filter.name + '_lt')] = endDate;
      }
    });

    return result;
  }

  snakeToCamel(str: string): string {
    return str
      .toLowerCase()
      .replace(/([_][a-z])/g, (group) => group.toUpperCase().replace('_', ''));
  }
}

type ExtraData = {
  [key: string]: {
    data: {
      id: number;
      name: string;
    }[];
    map: Map<number, string>;
  };
};

export interface Filter {
  type: 'search' | 'select' | 'select_null' | 'date' | 'date_range';
  name: string;
  value: string;
}
