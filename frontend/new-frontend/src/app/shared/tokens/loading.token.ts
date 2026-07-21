import { InjectionToken, signal } from "@angular/core";

export const LOADING = new InjectionToken('app loading', {
    factory: () => signal(false),
    providedIn: 'root',
})
