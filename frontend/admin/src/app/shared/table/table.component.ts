import {
  Component,
  DestroyRef,
  OnInit,
  computed,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import {
  MatPaginator,
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { finalize } from 'rxjs';
import { TableComponentPaginator } from './table.component.paginator';
import { TableFiltersDialogComponent } from './table-filters-dialog/table-filters-dialog.component';
import { DialogData } from './table-filters-dialog/table-filters-dialog.component.interface';
import {
  TableComponentConfig,
  GetStringKeys,
  FieldConfig,
  Filter,
  ExtraData,
  TableAction,
} from './table.component.interface';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { DateService } from '../../services/date.service';
import { HelperService } from '../../services/helper.service';
import { MasjedService } from '../../services/masjed.service';
import { ChangesFieldComponent } from '../changes-field/changes-field.component';
import { LOADING } from '../../tokens/loading.token';
import { TableConfirmationDialogComponent } from './table-confirmation-dialog/table-confirmation-dialog.component';
import { TableConfirmationDialogData } from './table-confirmation-dialog/table-confirmation-dialog.interface';
import { SnackbarService } from '../../services/snackbar.service';

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
    MatMenuModule,
    ReactiveFormsModule,
    RouterLink,
    TranslatePipe,
    ChangesFieldComponent,
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: TableComponentPaginator },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'outline',
        subscriptSizing: 'dynamic',
      },
    },
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent<T extends { id: number }> implements OnInit {
  private fb = inject(NonNullableFormBuilder);
  private dialog = inject(MatDialog);
  private masjed = inject(MasjedService);
  private destroyRef = inject(DestroyRef);
  private snackbar = inject(SnackbarService);
  public loading = inject(LOADING);
  public date = inject(DateService);
  public helper = inject(HelperService);

  public dataSource = new MatTableDataSource<T>([]);
  public selection = new SelectionModel<T>(true, []);
  public extraData: ExtraData = {};
  public searchForm = this.fb.group({
    searchValue: '',
  });
  public activeFilters = signal<Filter[]>([]);
  public totalCount = signal(0);
  public isFilters = signal(false);
  public containsChangesField = signal(false);
  public changesFieldHidden = signal(true);
  private pageSizeOptions = [20, 40, 100, 200];

  public _config = input.required<TableComponentConfig<T>>({
    alias: 'config',
  });
  get config() {
    return this._config();
  }

  private paginator = viewChild.required(MatPaginator);
  private sort = viewChild.required(MatSort);

  public displayedColumns = computed(() => {
    const columns = Object.entries<FieldConfig>(this.config.columns)
      .filter(([, field]) => field.display !== 'ignore')
      .filter(([name]) => name !== 'changes' || !this.changesFieldHidden())
      .map(([name]) => name);
    return ['check', 'id', ...columns] as (
      | 'check'
      | 'id'
      | GetStringKeys<Omit<T, 'id'>>
    )[];
  });

  ngOnInit(): void {
    Object.entries<FieldConfig>(this.config.columns).forEach(
      ([name, config]) => {
        if (config.display === 'relation') {
          config
            .getFieldValueFunc()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((res) => {
              this.extraData[name] = {
                data: res,
                map: this.convertDataToMap(res),
              };
            });
        }

        if (config.filterType !== undefined) {
          this.isFilters.set(true);
        }

        if (config.display === 'changes') {
          this.containsChangesField.set(true);
        }
      }
    );

    if (this.config.useStudentMasjedFilter) {
      this.isFilters.set(true);
      this.masjed
        .getMasjeds()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((res) => {
          this.extraData['student_masjed'] = {
            data: res,
            map: this.convertDataToMap(res),
          };
        });
    }

    this.paginator().pageSize = 20;
    this.fetchData();
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
    const fieldsFilters = Object.entries<FieldConfig>(this.config.columns)
      .filter(([_, config]) => {
        return config.filterType !== undefined;
      })
      .map(([name, config]) => {
        const activeFilter = this.activeFilters().find((f) => f.name === name);

        return {
          name,
          type: config.filterType!,
          defaultValue: activeFilter?.value,
        };
      });

    const masjedActiveFilter = this.activeFilters().find(
      (f) => f.name === 'student_masjed'
    );

    const masjedFilter: DialogData['filters'][number] =
      masjedActiveFilter !== undefined
        ? {
            ...masjedActiveFilter,
            type: 'exact',
            defaultValue: masjedActiveFilter.value,
          }
        : {
            name: 'student_masjed',
            type: 'exact',
            defaultValue: undefined,
          };

    const ref = this.dialog.open<TableFiltersDialogComponent, DialogData>(
      TableFiltersDialogComponent,
      {
        width: '600px',
        data: {
          extraData: this.extraData,
          filters: this.config.useStudentMasjedFilter
            ? [...fieldsFilters, masjedFilter]
            : fieldsFilters,
        },
      }
    );

    const sub = ref.componentInstance.onSubmit
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((newFilters) => {
        newFilters.forEach((f) => {
          // if the filter is boolean and the value is 0 (which is 'all')
          // then we will remove any previous filter for this field
          if (f.type === 'boolean' && f.value === '0') {
            const { name } = f;
            this.activeFilters.update((fs) =>
              fs.filter((f) => f.name !== name)
            );
          } else {
            this.addFilter(f);
          }
        });
        this.fetchData();
      });

    ref
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        sub.unsubscribe();
      });
  }

  fetchData(resetPagination = true, resetSort = true) {
    if (this.loading()) return;

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
        .pipe(takeUntilDestroyed(this.destroyRef))
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
        .pipe(takeUntilDestroyed(this.destroyRef))
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
      if (filter.type === 'search' || filter.type === 'select') {
        result[this.helper.snakeToCamel(filter.name)] = filter.value;
      } else if (filter.type === 'date') {
        if (
          this.config.columns[filter.name as keyof Omit<T, 'id'>].filterType ===
          'datetime_date'
        ) {
          result[this.helper.snakeToCamel(filter.name + '_date')] =
            filter.value;
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
          result[this.helper.snakeToCamel(filter.name)] = 'true';
        } else if (filter.value === '2') {
          result[this.helper.snakeToCamel(filter.name)] = 'false';
        } else {
          delete result[this.helper.snakeToCamel(filter.name)];
        }
      }
    });

    return result;
  }

  handleAction(action: TableAction) {
    const ids = this.selection.selected.map((item) => item.id);

    if (action.confirmation) {
      const ref = this.dialog.open<
        TableConfirmationDialogComponent,
        TableConfirmationDialogData
      >(TableConfirmationDialogComponent, {
        data: {
          message: action.confirmation.message,
        },
      });

      ref
        .afterClosed()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((res) => {
          if (res) {
            this.loading.set(true);
            action
              .delegateFunc(ids)
              .pipe(
                takeUntilDestroyed(this.destroyRef),
                finalize(() => this.loading.set(false))
              )
              .subscribe(() => {
                this.snackbar.success('تم الإجراء بنجاح');
                this.fetchData();
              });
          }
        });
    } else {
      this.loading.set(true);
      action
        .delegateFunc(ids)
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          finalize(() => this.loading.set(false))
        )
        .subscribe(() => {
          this.snackbar.success('تم الإجراء بنجاح');
          this.fetchData();
        });
    }
  }
}
