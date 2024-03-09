import { Routes } from "@angular/router";
import { AddingComponent } from "./adding.component";
import { AddingViewComponent } from "./adding-view/adding-view.component";

export const routes: Routes = [
    {
        path: '',
        component: AddingComponent,
    },
    {
        path: 'view/:id',
        component: AddingViewComponent,
    },
];