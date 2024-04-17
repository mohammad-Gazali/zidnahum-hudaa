import { Routes } from "@angular/router";
import { SettingsComponent } from "./settings/settings.component";
import { ReportsComponent } from "./reports/reports.component";
import { StatisticsComponent } from "./statistics/statistics.component";

export const routes: Routes = [
    {
        path: 'settings',
        component: SettingsComponent,
    },
    {
        path: 'reports',
        component: ReportsComponent,
    },
    {
        path: 'statistics',
        component: StatisticsComponent,
    }
];