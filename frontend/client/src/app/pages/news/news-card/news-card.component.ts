import { Component, inject, input } from "@angular/core";
import { MatCard, MatCardContent, MatCardHeader, MatCardImage, MatCardTitle } from "@angular/material/card";
import { News } from "@shared";
import { LightboxService } from "./lightbox/lightbox.service";

@Component({
  selector: 'app-news-card',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardImage,
    MatCardTitle,
  ],
  templateUrl: './news-card.component.html',
  styleUrl: './news-card.component.scss',
})
export class NewsCardComponent {
  private lightbox = inject(LightboxService);

  public news = input.required<News>();
  public index = input.required<number>();

  open() {
    const news = this.news();

    this.lightbox.open({
      alt: news.title,
      src: news.main_image,
    })
  }
}