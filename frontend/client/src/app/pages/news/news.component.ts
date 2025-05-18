import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { GlobalsService } from '@shared';
import { NewsCardComponent } from './news-card/news-card.component';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [
    MatTabGroup,
    MatTab,
    NewsCardComponent,
  ],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss',
})
export class NewsComponent {
  private globals = inject(GlobalsService);

  private news = toSignal(
    this.globals.globalsNews(),
    {
      initialValue: [],
    }
  );

  public hassaneinNews = computed(() => this.news().filter(({ masjed }) => masjed === 1))
  public qazzazNews = computed(() => this.news().filter(({ masjed }) => masjed === 3))
}
