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
      required?: boolean;
    }
  | {
      type: 'relation';
      relationType: 'nullable' | 'multiple' | 'normal';
      required?: boolean;
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
