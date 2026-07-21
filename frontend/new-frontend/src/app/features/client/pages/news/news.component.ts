import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { GlobalsClientService } from '@shared';
import { NewsCardComponent } from './news-card/news-card.component';

@Component({
  selector: 'app-news',
  imports: [MatTabGroup, MatTab, NewsCardComponent],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss',
})
export class NewsComponent {
  private globals = inject(GlobalsClientService);

  private news = toSignal(this.globals.globalsNews(), {
    initialValue: [],
  });

  public hassaneinNews = computed(() =>
    this.news().filter(({ masjed }) => masjed === 1),
  );
  public qazzazNews = computed(() =>
    this.news().filter(({ masjed }) => masjed === 3),
  );
  public khansaaNews = computed(() =>
    this.news().filter(({ masjed }) => masjed === 4),
  );
}
