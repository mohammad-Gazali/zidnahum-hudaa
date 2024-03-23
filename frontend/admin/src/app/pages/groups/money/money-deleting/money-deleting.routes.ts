import { Routes } from '@angular/router';
import { MoneyDeletingComponent } from './money-deleting.component';
import { MoneyDeletingViewComponent } from './money-deleting-view/money-deleting-view.component';

export const routes: Routes = [
    {
        path: '',
        component: MoneyDeletingComponent,
    },
    {
        path: 'view/:id',
        component: MoneyDeletingViewComponent,
    },
];