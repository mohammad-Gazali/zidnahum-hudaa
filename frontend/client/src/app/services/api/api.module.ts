/* tslint:disable */
import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationInterface } from './api-configuration';

import { AccountsService } from './services/accounts.service';
import { AwqafService } from './services/awqaf.service';
import { ComingsService } from './services/comings.service';
import { GlobalsService } from './services/globals.service';
import { PointsService } from './services/points.service';
import { ReportsService } from './services/reports.service';
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
    AccountsService,
    AwqafService,
    ComingsService,
    GlobalsService,
    PointsService,
    ReportsService,
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
