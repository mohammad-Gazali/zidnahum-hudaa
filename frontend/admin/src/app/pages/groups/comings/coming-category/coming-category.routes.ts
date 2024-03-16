import { Routes } from "@angular/router";
import { ComingCategoryComponent } from "./coming-category.component";
import { ComingCategoryViewComponent } from "./coming-category-view/coming-category-view.component";
import { ComingCategoryCreateComponent } from "./coming-category-create/coming-category-create.component";

export const routes: Routes = [
    {
        path: '',
        component: ComingCategoryComponent,
    },
    {
        path: 'view/:id',
        component: ComingCategoryViewComponent,
    },
    {
        path: 'create',
        component: ComingCategoryCreateComponent,
    },
];