/* tslint:disable */
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';

/**
 * Global configuration for Api services
 */
@Injectable({
  providedIn: 'root',
})
export class ApiConfiguration {
  rootUrl: string = environment.baseApiUrl;
}

export interface ApiConfigurationInterface {
  rootUrl?: string;
}
