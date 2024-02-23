import { Routes } from "@angular/router";
import { StudentGroupComponent } from "./group.component";
import { StudentGroupViewComponent } from "./group-view/group-view.component";
import { StudentGroupCreateComponent } from "./group-create/group-create.component";

export const routes: Routes = [
    {
        path: '',
        component: StudentGroupComponent,
    },
    {
        path: 'view/:id',
        component: StudentGroupViewComponent,
    },
    {
        path: 'create',
        component: StudentGroupCreateComponent,
    }
];