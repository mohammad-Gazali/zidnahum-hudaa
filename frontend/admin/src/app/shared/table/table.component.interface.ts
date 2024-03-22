import { Observable } from 'rxjs';

// Utility type to extract keys of type T that are strings
export type GetStringKeys<T> = Extract<keyof T, string>;

// Interface for field configuration
export type FieldConfig =
  | {
      display: 'normal';
      dateFormat?: string;
      filterType?: 'date' | 'datetime_date';
    }
  | {
      display: 'boolean';
      filterType?: 'boolean';
    }
  | {
      display: 'relation';
      filterType: 'exact' | 'exact_null';
      getFieldValueFunc: () => Observable<{ id: number; name: string }[]>;
    }
  | {
      display: 'link';
      filterType?: undefined;
      getUrlFunc: (id: number) => string;
      stringField: string;
    }
  | {
      display: 'ignore';
      filterType?: undefined;
    }
  | {
      display: 'changes';
      filterType?: undefined;
    }
  | {
    display: 'file-link';
    filterType?: undefined;
  };

// Interface for configuration of table component
export type TableComponentConfig<T> = {
  columns: {
    [K in keyof Omit<T, 'id'>]-?: FieldConfig;
  };
  searchField?: string;
  getUrlFunc: (id: string) => string;
  useStudentMasjedFilter?: boolean;
  createUrl?: string;
} & (
  | {
      hasPagination: true;
      dataFunc: (options: any) => Observable<PaginationListResponse<T>>;
    }
  | {
      hasPagination: false;
      dataFunc: (options: any) => Observable<Array<T>>;
    }
);

// Interface for pagination and sorting options
export interface PaginationSortOptions<T> {
  offset?: number;
  limit?: number;
  ordering?: `${GetStringKeys<T>}` | `-${GetStringKeys<T>}`;
}

// Type for response containing a list of items
type PaginationListResponse<T> = {
  count: number;
  next?: null | string;
  previous?: null | string;
  results: Array<T>;
};

export type ExtraData = {
  [key: string]: {
    data: {
      id: number;
      name: string;
    }[];
    map: Map<number, string>;
  };
};

export interface Filter {
  type: 'search' | 'select' | 'select_null' | 'date' | 'date_range' | 'boolean';
  name: string;
  value: string;
}
