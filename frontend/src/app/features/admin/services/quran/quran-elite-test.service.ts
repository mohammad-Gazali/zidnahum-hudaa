import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class QuranEliteTestService {
    public transform(index: number) {
        return `الحزب ${index + 1}`;
    }
}