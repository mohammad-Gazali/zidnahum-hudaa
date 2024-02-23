import { Routes } from "@angular/router";
import { routes as usersRoutes } from './user/user.routes';
import { routes as groupsRoutes } from './group/group.routes';

export const routes: Routes = [
    {
        path: 'user',
        children: usersRoutes,
    },
    {
        path: 'group',
        children: groupsRoutes,
    },
];