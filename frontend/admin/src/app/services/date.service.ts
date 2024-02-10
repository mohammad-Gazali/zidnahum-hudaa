import { formatDate } from "@angular/common";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class DateService {
    format(date: Date): string {
        return formatDate(date, 'yyyy-MM-dd', 'en-US');
    }
}