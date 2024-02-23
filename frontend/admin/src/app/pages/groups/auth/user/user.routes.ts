import { Routes } from "@angular/router";
import { UserComponent } from "./user.component";
import { UserViewComponent } from "./user-view/user-view.component";
import { UserCreateComponent } from "./user-create/user-create.component";

export const routes: Routes = [
    {
        path: '',
        component: UserComponent,
    },
    {
        path: 'view/:id',
        component: UserViewComponent,
    },
    {
        path: 'create',
        component: UserCreateComponent,
    },
];