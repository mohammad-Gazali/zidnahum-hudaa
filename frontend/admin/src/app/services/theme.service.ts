import { Injectable, signal } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class ThemeService {
    private darkMode = signal(false);

    constructor () {
        const theme = localStorage.getItem('theme') ?? 'light';
        if (theme === 'dark') {
            this.darkMode.set(true);
        } else {
            this.darkMode.set(false);
        }
    }

    get isDarkMode() {
        return this.darkMode.asReadonly();
    }

    setDarkMode(isDarkMode: boolean) {
        this.darkMode.set(isDarkMode);

        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }
}