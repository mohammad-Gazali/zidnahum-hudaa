import { Routes } from '@angular/router';
import { routes as comingCategoryRoutes } from './coming-category/coming-category.routes';
import { routes as comingRoutes } from './coming/coming.routes';

export const routes: Routes = [
  {
    path: 'coming-category',
    children: comingCategoryRoutes,
  },
  {
    path: 'coming',
    children: comingRoutes,
  }
];
