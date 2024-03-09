import { Routes } from "@angular/router";
import { DeletingComponent } from "./deleting.component";
import { DeletingViewComponent } from "./deleting-view/deleting-view.component";

export const routes: Routes = [
    {
        path: '',
        component: DeletingComponent,
    },
    {
        path: 'view/:id',
        component: DeletingViewComponent,
    },
];