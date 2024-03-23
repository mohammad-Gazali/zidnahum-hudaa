import { Routes } from '@angular/router';
import { MoneyDeletingCauseComponent } from './money-deleting-cause.component';
import { MoneyDeletingCauseCreateComponent } from './money-deleting-cause-create/money-deleting-cause-create.component';
import { MoneyDeletingCauseViewComponent } from './money-deleting-cause-view/money-deleting-cause-view.component';

export const routes: Routes = [
    {
        path: '',
        component: MoneyDeletingCauseComponent,
    },
    {
        path: 'create',
        component: MoneyDeletingCauseCreateComponent,
    },
    {
        path: 'view/:id',
        component: MoneyDeletingCauseViewComponent,
    },
];