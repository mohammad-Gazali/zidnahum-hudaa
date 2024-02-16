import { Observable } from "rxjs";
import { ValidatorFn } from "@angular/forms";
import { Signal } from "@angular/core";

export interface ViewComponentConfig<T> {
    editable: boolean;
    fieldsInfo: {
        [K in keyof Omit<Partial<T>, 'id'>]: FieldConfig;
    };
    viewFunc: (id: string) => Observable<T>;
}

export type FieldConfig = ({
    type: 'boolean' | 'number' | 'date' | 'datetime' | 'string' | 'custom';
    validators?: ValidatorFn[];
    nonEditable?: boolean;
} | {
    type: 'relation';
    nullable: boolean;
    nonEditable?: boolean;
    validators?: ValidatorFn[];
    getFieldValueFunc: () => Observable<{ id: number; name: string; }[]>;
    getUrlFunc?: (id: number | null) => string;
});

export type Field = {
    name: string;
    value: any;
    type: 'string' | 'boolean' | 'number' | 'date' | 'datetime' | 'custom' | 'relation';
    nonEditable?: boolean;
    nullable: boolean;
}

export type ExtraData = {
    [key: string]: {
        map: Map<number, string>;
        data: Signal<{
            id: number;
            name: string;
        }[]>;
        getUrlFunc?: (id: number | null) => string;
    }
};