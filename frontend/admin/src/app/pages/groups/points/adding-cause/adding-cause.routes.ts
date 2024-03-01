import { Routes } from "@angular/router";
import { AddingCauseComponent } from "./adding-cause.component";
import { AddingCauseViewComponent } from "./adding-cause-view/adding-cause-view.component";
import { AddingCauseCreateComponent } from "./adding-cause-create/adding-cause-create.component";

export const routes: Routes = [
    {
        path: '',
        component: AddingCauseComponent,
    },
    {
        path: 'view/:id',
        component: AddingCauseViewComponent,
    },
    {
        path: 'create',
        component: AddingCauseCreateComponent,
    },
];