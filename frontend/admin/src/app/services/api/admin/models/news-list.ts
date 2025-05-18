export interface NewsList {
  id: number;
  title: string;
  description?: string;
  main_image: string;
  low_quality_image: string;
  masjed: 1 | 2 | 3;
}