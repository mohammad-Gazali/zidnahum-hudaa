import { Injectable, inject } from "@angular/core";
import { MatPaginatorIntl } from "@angular/material/paginator";
import { Subject } from "rxjs";
import { TranslateService } from "../../services/translate.service";

@Injectable()
export class TableComponentPaginator implements MatPaginatorIntl {
    private translate = inject(TranslateService)

    changes = new Subject<void>();

    firstPageLabel = this.translate.translate('First page');
    lastPageLabel= this.translate.translate('Last page');
    itemsPerPageLabel = this.translate.translate('Items per page');
    nextPageLabel = this.translate.translate('Next page');
    previousPageLabel = this.translate.translate('Previous page');

    getRangeLabel(page: number, pageSize: number, length: number): string {
        if (length === 0) {
            return `${this.translate.translate('Page')} 1 ${this.translate.translate('of')} 1`;
        }
        
        const amountPages = Math.ceil(length / pageSize);

        return `${this.translate.translate('Page')} ${page + 1} ${this.translate.translate('of')} ${amountPages}`
    }
}