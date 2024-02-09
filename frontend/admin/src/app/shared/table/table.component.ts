import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import {
  MatPaginator,
  MatPaginatorIntl,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { TableComponentConfig, PaginationSortOptions, GetStringKeys, FieldConfig, CellDisplay, FilterType } from './table.component.config';
import { Subject, takeUntil } from 'rxjs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { TableComponentPaginator } from './table.component.paginator';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';

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
    RouterLink,
    FormsModule,
    TranslatePipe,
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: TableComponentPaginator }],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent<T> implements OnInit, OnDestroy {
  @Input({ required: true }) public config!: TableComponentConfig<T>;

  public dataSource = new MatTableDataSource<T>([]);
  public selection = new SelectionModel<T>(true, []);
  public displayedColumns: ('check' | 'id' | GetStringKeys<Omit<T, 'id'>>)[] = [];
  public extraData: ExtraData = {};
  public CellDisplay = CellDisplay;
  public searchField?: string;
  private destroyed$ = new Subject<void>();
  private pageSizeOptions = [20, 40, 100, 200];

  @ViewChild(MatPaginator, { static: true }) private paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) private sort!: MatSort;

  ngOnInit(): void {
    const keys = Object.keys(this.config.columns) as GetStringKeys<Omit<T, 'id'>>[];
    this.displayedColumns = ['check', 'id', ...keys];

    Object.entries<FieldConfig>(this.config.columns).forEach(([name, config]) => {
      if (config.display === CellDisplay.RELATION) {
        config.getFieldValueFunc!().pipe(takeUntil(this.destroyed$)).subscribe(res => {
          this.extraData[name] = {
            data: res,
            map: this.convertDataToMap(res),
          };
        });
      }

      if (config.filterType === FilterType.EXACT || config.filterType === FilterType.EXACT_NULL) {
        if (this.extraData[name] === undefined) {
          config.getFieldValueFunc!().pipe(takeUntil(this.destroyed$)).subscribe(res => {
            this.extraData[name] = {
              data: res,
              map: this.convertDataToMap(res),
            };
          }); 
        }
      }

      if (config.isSearchField) {
        this.searchField = name;
      }
    });

    

    this.config.dataFunc({}).pipe(takeUntil(this.destroyed$)).subscribe((data) => {
      if (data instanceof Array) {
        this.dataSource.data = data;
      } else {
        this.dataSource.data = data.results;
        this.paginator.pageSize = data.results.length;
        this.paginator.length = data.count;
  
        this.paginator.pageSizeOptions = this.getPageSizeOptions();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  onPageChange(event: PageEvent) {
    const options: PaginationSortOptions<T> = {
      limit: event.pageSize,
      offset: event.pageIndex * event.pageSize,
    };

    const activeField = this.sort.active as GetStringKeys<T>;

    if (this.sort.direction !== "") {
      options.ordering = this.sort.direction === "asc" ? `${activeField}` : `-${activeField}`;
    }

    this.config.dataFunc(options).pipe(takeUntil(this.destroyed$)).subscribe((data) => {
      if (data instanceof Array) {
        this.dataSource.data = data;
      } else {
        this.dataSource.data = data.results;
      }
      this.selection = new SelectionModel<T>(true, []);
    });
  }

  onSortChange(event: Sort) {
    this.paginator.pageIndex = 0;

    const options: PaginationSortOptions<T> = {
      limit: this.paginator.pageSize,
      offset: 0,
    };

    const activeField = event.active as GetStringKeys<T>;

    if (event.direction !== "") {
      options.ordering = event.direction === "asc" ? `${activeField}` : `-${activeField}`;
    }

    this.config.dataFunc(options).pipe(takeUntil(this.destroyed$)).subscribe((data) => {
      if (data instanceof Array) {
        this.dataSource.data = data;
      } else {
        this.dataSource.data = data.results;
      }
      this.selection = new SelectionModel<T>(true, []);
    });
  }

  private getPageSizeOptions(): number[] {
    // this index indicates the required index for getting the sutiable page
    // size options
    const targetIndex = this.pageSizeOptions.findIndex((size) => size >= this.paginator.length);

    return targetIndex === - 1 ? this.pageSizeOptions : this.pageSizeOptions.slice(0, targetIndex);
  }

  private convertDataToMap(data: { id: number; name: string }[]): Map<number, string> {
    const result = new Map<number, string>();
    
    data.forEach(item => {
      result.set(item.id, item.name);
    });

    return result;
  }

  public handleChangeSearch(event: Event) {
    
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