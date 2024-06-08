import { inject, Pipe, PipeTransform } from '@angular/core';
import { MemoService } from '../services/memo.service';

@Pipe({
    name: 'memo',
    standalone: true,
})
export class MemoPipe implements PipeTransform {
    private memo = inject(MemoService);

    transform(value: number) {
      return this.memo.transform(value);
    }
}
