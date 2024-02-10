import { Observable } from "rxjs";

// Utility type to extract keys of type T that are strings
export type GetStringKeys<T> = Extract<keyof T, string>;


// Interface for field configuration
export type FieldConfig = ({
    display: "relation";
    filterType: "exact" | "exact_null";
    getFieldValueFunc: () => Observable<{ id: number; name: string; }[]>;
    // I added this because of error appear in the html template with angular language server
    // the expected behavior that when the display is "link" the getUrlFunc will exist
    // but this is not the case here and I don't know why.
    getUrlFunc?: null;
} | {
    display: "link",
    filterType: undefined;
    getUrlFunc: (id: number) => string;
} | {
    display: "normal";
    filterType?: "date";
    // ... the same reason in the top ...
    getUrlFunc?: null;
});

// Interface for configuration of table component
export type TableComponentConfig<T> = {
    columns: {
        [K in keyof Omit<T, 'id'>]-?: FieldConfig;
    };
    searchField?: string;
    getUrlFunc: (id: string) => string;
} & ({
    hasPagination: true;
    dataFunc: (options: any) => Observable<PaginationListResponse<T>>;
} | {
    hasPagination: false;
    dataFunc: (options: any) => Observable<Array<T>>;
})

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
}