import { Observable } from "rxjs";
import { ValidatorFn } from "@angular/forms";
import { Signal } from "@angular/core";

export interface ViewComponentConfig<T, U = null> {
    fieldsInfo: {
        [K in keyof Omit<Partial<T>, 'id'>]: FieldConfig;
    };
    groupName: string;
    itemNameAndRouteName: string;
    viewFunc: (id: string) => Observable<T>;
    deleteFunc?: (id: string) => Observable<null>;
    updateFunc?: (id: string, data: U) => Observable<any>;
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