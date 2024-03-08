import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class QuranTestService {
    public transform(index: number) {
        return `الجزء ${index + 1}`
    }
}