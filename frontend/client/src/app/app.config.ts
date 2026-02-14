import {
  provideAppInitializer,
  ApplicationConfig,
  inject,
} from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";
import { AuthService } from "@shared";
import { routes } from "./app.routes";
import { interceptors } from "./interceptors";

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors(interceptors)),
    provideRouter(routes),
    provideAppInitializer(() => {
      const auth = inject(AuthService);

      auth.initialize();
    }),
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: "outline",
      },
    },
  ],
};
