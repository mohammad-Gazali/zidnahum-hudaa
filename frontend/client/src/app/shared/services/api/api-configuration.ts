/* tslint:disable */
import { Injectable } from '@angular/core';

/**
 * Global configuration for Api services
 */
@Injectable({
  providedIn: 'root',
})
export class ApiConfiguration {
  rootUrl: string = 'http://127.0.0.1:8000/api/v1';
}

export interface ApiConfigurationInterface {
  rootUrl?: string;
}
