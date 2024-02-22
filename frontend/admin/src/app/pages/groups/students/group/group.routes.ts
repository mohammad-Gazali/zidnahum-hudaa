import { Routes } from "@angular/router";
import { GroupComponent } from "./group.component";
import { GroupViewComponent } from "./group-view/group-view.component";
import { GroupCreateComponent } from "./group-create/group-create.component";

export const routes: Routes = [
    {
        path: '',
        component: GroupComponent,
    },
    {
        path: 'view/:id',
        component: GroupViewComponent,
    },
    {
        path: 'create',
        component: GroupCreateComponent,
    }
];