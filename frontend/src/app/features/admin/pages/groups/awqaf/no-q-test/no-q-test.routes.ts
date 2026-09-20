import { Routes } from "@angular/router";
import { NoQTestComponent } from "./no-q-test.component";
import { NoQTestCreateComponent } from "./no-q-test-create/no-q-test-create.component";
import { NoQTestViewComponent } from "./no-q-test-view/no-q-test-view.component";

export const routes: Routes = [
    {
        path: '',
        component: NoQTestComponent,
    },
    {
        path: 'create',
        component: NoQTestCreateComponent,
    },
    {
        path: 'view/:id',
        component: NoQTestViewComponent,
    },
];