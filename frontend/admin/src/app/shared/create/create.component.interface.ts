import { ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';

export interface CreateComponentConfig<T> {
  createFunc: (body: T) => Observable<T>;
  fields: {
    [K in keyof Omit<T, 'id'>]-?: FieldConfig;
  };
  tableRoute: string;
}

export type FieldConfig =
  | {
      type: 'string' | 'password' | 'number' | 'boolean' | 'date';
      validators?: ValidatorFn[];
    }
  | {
      type: 'relation';
      relationType: 'nullable' | 'multiple' | 'normal';
      validators?: ValidatorFn[];
      getFieldValueFunc: () => Observable<{ id: number; name: string }[]>;
    };

export interface Field {
  name: string;
  config: FieldConfig;
  options: {
    id: number;
    name: string;
  }[];
}
