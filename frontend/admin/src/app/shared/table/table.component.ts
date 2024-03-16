import {
  Component,
  OnDestroy,
  OnInit,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import {
  MatPaginator,
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import {
  TableComponentConfig,
  GetStringKeys,
  FieldConfig,
  Filter,
  ExtraData,
} from './table.component.interface';
import { Subject, takeUntil } from 'rxjs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { TableComponentPaginator } from './table.component.paginator';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { LoadingService } from '../../services/loading.service';
import { TableFiltersDialogComponent } from './table-filters-dialog/table-filters-dialog.component';
import { DateService } from '../../services/date.service';
import { HelperService } from '../../services/helper.service';
import { DialogData } from './table-filters-dialog/table-filters-dialog.component.interface';

// TODO: add actions to table

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
  
})
export class TableComponent<T> implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private loading = inject(LoadingService).loading;
  private dialog = inject(MatDialog);
  public date = inject(DateService);
  public helper = inject(HelperService);

  public dataSource = new MatTableDataSource<T>([]);
  public selection = new SelectionModel<T>(true, []);
  public displayedColumns: ('check' | 'id' | GetStringKeys<Omit<T, 'id'>>)[] =
    [];
  public extraData: ExtraData = {};
  public searchForm = this.fb.nonNullable.group({
    searchValue: '',
  });
  public activeFilters = signal<Filter[]>([]);
  public totalCount = signal(0);
  public isFileters = signal(false);
  private destroyed$ = new Subject<void>();
  private pageSizeOptions = [20, 40, 100, 200];

  public _config = input.required<TableComponentConfig<T>>({
    alias: 'config'
  });
  get config() {
    return this._config();
  }

  private paginator = viewChild.required(MatPaginator);
  private sort = viewChild.required(MatSort);

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

        if (config.filterType !== undefined) {
          this.isFileters.set(true);
        }

        if (config.display === 'ignore') {
          this.displayedColumns = this.displayedColumns.filter(c => c !== name)
        }
      }
    );
  
    this.paginator().pageSize = 20;  
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
    this.paginator().pageIndex = 0;

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
      this.activeFilters.update((pre) => {
        const afterDelete = pre.filter((f) => f !== existing);
        return [...afterDelete, filter];
      });
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
          extraData: this.extraData,
          filters: Object.entries<FieldConfig>(this.config.columns)
            .filter(([_, config]) => {
              return config.filterType !== undefined;
            })
            .map(([name, config]) => {
              const activeFilter = this.activeFilters().find(f => f.name === name);

              return {
                name,
                type: config.filterType!,
                defaultValue: activeFilter?.value,
              };
            }),
        },
      }
    );

    const sub = ref.componentInstance.onSubmit
      .pipe(takeUntil(this.destroyed$))
      .subscribe((newFilters) => {
        newFilters.forEach((f) => {
          // if the filter is boolean and the value is 0 (which is 'all')
          // then we will remove any previous filter for this field
          if (f.type === 'boolean' && f.value === '0') {
            const { name } = f;
            this.activeFilters.update(fs => fs.filter(f => f.name !== name));
          } else {
            this.addFilter(f);
          }
        });
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

    if (!resetSort && this.sort().direction !== '') {
      const activeField = this.sort().active;
      options.ordering =
        this.sort().direction === 'asc' ? `${activeField}` : `-${activeField}`;
    }

    if (resetSort) {
      this.sort().direction = '';
    }
    this.loading.set(true);

    if (this.config.hasPagination) {
      if (!resetPagination) {
        options.limit = this.paginator().pageSize;
        options.offset = this.paginator().pageIndex * this.paginator().pageSize;
      }

      this.config
        .dataFunc(options)
        .pipe(takeUntil(this.destroyed$))
        .subscribe((res) => {
          this.dataSource.data = res.results;

          this.totalCount.set(res.count);
          this.paginator().length = res.count;
          this.paginator().pageSizeOptions = this.getPageSizeOptions();

          if (resetPagination) {
            this.paginator().pageIndex = 0;
          }

          this.selection = new SelectionModel<T>(true, []);
          this.loading.set(false);
        });
    } else {
      this.config
        // here we passed directly ordering because when the there is one query
        // param the function accept it directly without being wrapped in object
        //! === Warning ===
        //! SO be careful if there if any new query param added to non-pagination
        //! tables
        .dataFunc(options?.ordering)
        .pipe(takeUntil(this.destroyed$))
        .subscribe((res) => {
          this.dataSource.data = res;
          this.selection = new SelectionModel<T>(true, []);
          this.loading.set(false);
        });
    }
  }

  activeFiltersToOptions() {
    const result: any = {};

    this.activeFilters().forEach((filter) => {
      if (
        filter.type === 'search' ||
        filter.type === 'select'
      ) {
        result[this.helper.snakeToCamel(filter.name)] = filter.value;
      } else if (filter.type === 'date') {
        if (this.config.columns[filter.name as keyof Omit<T, "id">].filterType === 'datetime_date') {
          result[this.helper.snakeToCamel(filter.name + '_date')] = filter.value;
        } else {
          result[this.helper.snakeToCamel(filter.name)] = filter.value;
        }
      } else if (filter.type === 'select_null') {
        if (filter.value === '-1') {
          result[this.helper.snakeToCamel(filter.name + '_isnull')] = 'True';
        } else {
          result[this.helper.snakeToCamel(filter.name)] = filter.value;
        }
      } else if (filter.type === 'date_range') {
        const [startDate, endDate] = this.date.extractTwoDates(filter.value);

        result[this.helper.snakeToCamel(filter.name + '_gt')] = startDate;
        result[this.helper.snakeToCamel(filter.name + '_lt')] = endDate;
      } else if (filter.type === 'boolean') {
        if (filter.value === '1') {
          result[this.helper.snakeToCamel(filter.name)] = 'true'
        } else if (filter.value === '2') {
          result[this.helper.snakeToCamel(filter.name)] = 'false'
        } else {
          delete result[this.helper.snakeToCamel(filter.name)];
        }
      }
    });
    
    return result;
  }
}
