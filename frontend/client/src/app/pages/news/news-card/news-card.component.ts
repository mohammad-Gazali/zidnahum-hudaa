import { Component, input } from "@angular/core";
import { MatCard, MatCardContent, MatCardHeader, MatCardImage, MatCardTitle } from "@angular/material/card";
import { News } from "@shared";

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
  public news = input.required<News>();

  open() {
    // comes from global import of fslightbox
    //
    // @ts-ignore
    refreshFsLightbox()
    // @ts-ignore
    fsLightbox.open()
  }
}