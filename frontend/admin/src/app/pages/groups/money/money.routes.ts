import { Routes } from '@angular/router';
import { routes as moneyDeletingCauseRoutes } from './money-deleting-cause/money-deleting-cause.routes';
import { routes as moneyDeletingRoutes } from './money-deleting/money-deleting.routes';
import { AddMoneyDeletingComponent } from './add-money-deleting/add-money-deleting.component';

export const routes: Routes = [
    {
        path: 'money-deleting-cause',
        children: moneyDeletingCauseRoutes,
    },
    {
        path: 'money-deleting',
        children: moneyDeletingRoutes,
    },
    {
        path: 'add-money-deleting',
        component: AddMoneyDeletingComponent,
    }
];