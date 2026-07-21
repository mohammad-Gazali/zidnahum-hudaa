import { InjectionToken, signal } from "@angular/core";

export const LOADING = new InjectionToken('admin loading', {
    factory: () => signal(false),
    providedIn: 'root',
})