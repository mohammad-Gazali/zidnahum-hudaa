import { Routes } from "@angular/router";
import { DeletingCauseComponent } from "./deleting-cause.component";
import { DeletingCauseViewComponent } from "./deleting-cause-view/deleting-cause-view.component";
import { DeletingCauseCreateComponent } from "./deleting-cause-create/deleting-cause-create.component";

export const routes: Routes = [
    {
        path: '',
        component: DeletingCauseComponent,
    },
    {
        path: 'view/:id',
        component: DeletingCauseViewComponent,
    },
    {
        path: 'create',
        component: DeletingCauseCreateComponent,
    },
];