import { Observable } from "rxjs";

// Utility type to extract keys of type T that are strings
export type GetStringKeys<T> = Extract<keyof T, string>;

// Enumeration for different types of cell display
export enum CellDisplay {
    NORMAL,
    LINK,
    RELATION,
}

// Enumeration for different filter types
export enum FilterType {
    EXACT,
    EXACT_NULL,
    DATE,
}

// Interface for field configuration
export interface FieldConfig {
    display?: CellDisplay;
    isSearchField?: boolean;
    filterType?: FilterType;
    getFieldValueFunc?: () => Observable<{ id: number; name: string; }[]>;
    getUrlFunc?: (id: number) => string;
}

// Interface for configuration of table component
export interface TableComponentConfig<T> {
    columns: {
        [K in keyof Omit<T, 'id'>]-?: FieldConfig;
    };
    hasPagination?: boolean;
    dataFunc: (options: PaginationSortOptions<T>) => Observable<ListResponse<T>>;
    getUrlFunc: (id: string) => string;
}

// Interface for pagination and sorting options
export interface PaginationSortOptions<T> {
    offset?: number;
    limit?: number;
    ordering?: `${GetStringKeys<T>}` | `-${GetStringKeys<T>}`;
}

// Type for response containing a list of items
type ListResponse<T> = {
    count: number;
    next?: null | string;
    previous?: null | string;
    results: Array<T>;
} | Array<T>
