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
    extraAction?: {
        name: string;
        icon: string;
        link: (id: string) => string;
    },
}

export type FieldConfig = ({
    type: 'boolean' | 'number' | 'date' | 'datetime' | 'string' | 'q_memorize' | 'q_test' | 'q_elite_test' | 'q_test_awqaf' | 'changes';
    validators?: ValidatorFn[];
    nonEditable?: boolean;
} | {
    type: 'relation';
    relationType: 'nullable' | 'multiple' | 'normal';
    nonEditable?: boolean;
    validators?: ValidatorFn[];
    getFieldValueFunc: () => Observable<{ id: number; name: string; }[]>;
    getUrlFunc?: (id: number | null) => string;
} | {
    type: 'link';
    stringField: string;
    nonEditable?: boolean;
    validators?: ValidatorFn[];
    getUrlFunc: (id: number) => string;
} | {
    type: 'ignore';
    validators?: ValidatorFn[];
    nonEditable?: boolean;
});

export type Field = {
    name: string;
    value: any;
    type: 'string' | 'boolean' | 'number' | 'date' | 'datetime' | 'q_memorize' | 'q_test' | 'q_elite_test' | 'q_test_awqaf' | 'changes';
    nonEditable?: boolean;
} | {
    name: string;
    value: any;
    type: 'relation';
    nonEditable?: boolean;
    relationType: 'nullable' | 'multiple' | 'normal';
} | {
    name: string;
    stringFieldValue: string;
    url: string;
    nonEditable?: boolean;
    type: 'link';
} | {
    name: string;
    type: 'ignore';
    value: any;
    nonEditable?: boolean;
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