/* tslint:disable */
import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationInterface } from './api-configuration';

import { AuthService } from './services/auth.service';
import { AwqafService } from './services/awqaf.service';
import { ComingsService } from './services/comings.service';
import { GlobalsService } from './services/globals.service';
import { MoneyService } from './services/money.service';
import { PointsService } from './services/points.service';
import { StudentsService } from './services/students.service';

/**
 * Provider for all Api services, plus ApiConfiguration
 */
@NgModule({
  imports: [
    HttpClientModule
  ],
  exports: [
    HttpClientModule
  ],
  declarations: [],
  providers: [
    ApiConfiguration,
    AuthService,
    AwqafService,
    ComingsService,
    GlobalsService,
    MoneyService,
    PointsService,
    StudentsService
  ],
})
export class ApiModule {
  static forRoot(customParams: ApiConfigurationInterface): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: {rootUrl: customParams.rootUrl}
        }
      ]
    }
  }
}
