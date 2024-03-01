import { Routes } from "@angular/router";
import { DeletingComponent } from "./deleting.component";
import { DeletingViewComponent } from "./deleting-view/deleting-view.component";
import { DeletingCreateComponent } from "./deleting-create/deleting-create.component";

export const routes: Routes = [
    {
        path: '',
        component: DeletingComponent,
    },
    {
        path: 'view/:id',
        component: DeletingViewComponent,
    },
    {
        path: 'create',
        component: DeletingCreateComponent,
    },
];