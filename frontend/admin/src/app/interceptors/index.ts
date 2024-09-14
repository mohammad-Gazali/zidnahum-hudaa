import { HttpInterceptorFn } from '@angular/common/http';
import { authInterceptor } from './auth.interceptor';
import { errorInterceptor } from './error.interceptor';

export const interceptors: HttpInterceptorFn[] = [
  authInterceptor,
  errorInterceptor,
];
