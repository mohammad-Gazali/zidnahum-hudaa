import { Routes } from "@angular/router";
import { routes as assetsCategoryRoutes } from './assets-category/assets-category.routes';
import { routes as assetsFileRoutes } from './assets-file/assets-file.routes';
import { routes as newsRoutes } from './news/news.routes';

export const routes: Routes = [
    {
        path: 'assets-category',
        children: assetsCategoryRoutes,
    },
    {
        path: 'assets-file',
        children: assetsFileRoutes,
    },
    {
        path: 'news',
        children: newsRoutes,
    }
];