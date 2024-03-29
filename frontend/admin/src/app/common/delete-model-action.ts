import { Observable } from "rxjs";
import { TableAction } from "../shared/table/table.component.interface";

export const deleteModelAction = (model: string, delegateFunc: (ids: number[]) => Observable<any>): TableAction => {
    return {
        name: 'delete',
        confirmation: {
            message: `هل أنت متأكد من حذف ${model} ؟`
        },
        delegateFunc,
    }
}