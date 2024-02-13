import { Observable } from "rxjs";

export interface ViewComponentConfig<T> {
    editable: boolean;
    fieldsInfo: {
        [K in keyof Omit<Partial<T>, 'id'>]: FieldConfig;
    };
    viewFunc: (id: string) => Observable<T>;
}

export type FieldConfig = {
    type: 'boolean' | 'number' | 'relation' | 'date' | 'datetime' | 'custom';
};

export interface Field {
    name: string;
    value: any;
    type: 'string' | 'boolean' | 'number' | 'relation' | 'date' | 'datetime' | 'custom';
}