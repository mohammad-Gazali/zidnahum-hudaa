import { formatDate } from "@angular/common";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class DateService {
    format(date: Date | string, formatString: string): string {
        return formatDate(date, formatString, 'en-US')
    }

    concatTwoDates(startDate: string, endDate: string) {
        return `${startDate}=${endDate}`
    }

    extractTwoDates(input: string): [string, string] {
        const [startDate, endDate] = input.split('=');
        return [startDate, endDate];
    }

    containsSeparator(input: string) {
        return input.includes('=')
    }
}