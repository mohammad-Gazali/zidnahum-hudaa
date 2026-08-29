import { InjectionToken, signal } from "@angular/core";

// TODO: make sure the loading is working well
export const LOADING = new InjectionToken('app loading', {
    factory: () => signal(false),
    providedIn: 'root',
})
