import { Injectable } from "@angular/core";
import { MemoItemType } from "./quran.constatns";
import { FormControl } from "@angular/forms";

@Injectable({
    providedIn: 'root',
})
export class QuranTestService {
    public transform(index: number) {
        return `الربع ${index + 1}`;
    }

    public spliteArray(array: FormControl<MemoItemType>[]): FormControl<MemoItemType>[][][] {
        const result = [];

        for (let i = 0; i < array.length; i += 8) {
            const currentBigChunk = [];

            const chunk = array.slice(i, i + 8);
            
            currentBigChunk.push(chunk.slice(0, 4));
            currentBigChunk.push(chunk.slice(4));

            result.push(currentBigChunk);
        }        

        return result;
    }
}