import { Routes } from "@angular/router";
import { ComingComponent } from "./coming.component";
import { ComingViewComponent } from "./coming-view/coming-view.component";

export const routes: Routes = [
    {
        path: '',
        component: ComingComponent,
    },
    {
        path: 'view/:id',
        component: ComingViewComponent,
    }
]