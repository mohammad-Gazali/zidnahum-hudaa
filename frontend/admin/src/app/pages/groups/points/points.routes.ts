import { Routes } from "@angular/router";
import { routes as addingRoutes } from './adding/adding.routes';
import { routes as addingCauseRoutes } from './adding-cause/adding-cause.routes';
import { routes as deletingRoutes } from './deleting/deleting.routes';
import { routes as deletingCauseRoutes } from './deleting-cause/deleting-cause.routes';

export const routes: Routes = [
    {
        path: 'adding',
        children: addingRoutes,
    },
    {
        path: 'adding-cause',
        children: addingCauseRoutes,
    },
    {
        path: 'deleting',
        children: deletingRoutes,
    },
    {
        path: 'deleting-cause',
        children: deletingCauseRoutes,
    },
];