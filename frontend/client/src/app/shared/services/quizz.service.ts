import { inject, Injectable, signal } from '@angular/core';
import { ApiConfiguration } from './api/api-configuration';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class QuizzService {
  private configuration = inject(ApiConfiguration);
  private http = inject(HttpClient);

  private csrfToken = document.documentElement.dataset['csrf']!;
  private currentQuizzAccount = signal<QuizzAccountStudent | null>(null);

  constructor() {
    this.http.get
  }
}


interface QuizzAccountStudent {
  id: number;
  name: string;
}