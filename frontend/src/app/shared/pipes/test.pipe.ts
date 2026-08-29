import { Pipe, PipeTransform, inject } from '@angular/core';
import { TestService } from '../services/test.service';

@Pipe({
  name: 'test',
  standalone: true,
})
export class TestPipe implements PipeTransform {
  private test = inject(TestService);

  transform(value: number): string {
    return this.test.transform(value);
  }
}
