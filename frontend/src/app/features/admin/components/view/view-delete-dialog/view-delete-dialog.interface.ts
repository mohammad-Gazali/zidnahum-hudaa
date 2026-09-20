import { Observable } from "rxjs";

export interface DialogData {
    deleteFunc: () => Observable<null>;
    groupName: string;
    itemNameAndRouteName: string;
}