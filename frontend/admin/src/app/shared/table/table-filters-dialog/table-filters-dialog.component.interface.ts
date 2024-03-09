export interface DialogData {
  filters: DialogFilter[];
  extraData: ExtraData;
}

interface DialogFilter {
  name: string;
  type: 'date' | 'datetime_date' | 'exact' | 'exact_null';
  defaultValue?: string;
}

export type ExtraData = {
  [key: string]: {
    data: {
      id: number;
      name: string;
    }[];
    map: Map<number, string>;
  };
};
