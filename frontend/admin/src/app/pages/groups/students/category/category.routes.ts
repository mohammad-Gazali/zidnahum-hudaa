import { Routes } from "@angular/router";
import { CategoryComponent } from "./category.component";
import { CategoryViewComponent } from "./category-view/category-view.component";
import { CategoryCreateComponent } from "./category-create/category-create.component";

export const routes: Routes = [
    {
        path: '',
        component: CategoryComponent,
    },
    {
        path: 'view/:id',
        component: CategoryViewComponent,
    },
    {
        path: 'create',
        component: CategoryCreateComponent,
    },
];