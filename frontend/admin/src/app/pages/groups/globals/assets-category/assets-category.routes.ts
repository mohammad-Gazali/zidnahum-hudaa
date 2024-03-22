import { Routes } from "@angular/router";
import { AssetsCategoryComponent } from "./assets-category.component";
import { AssetsCategoryCreateComponent } from "./assets-category-create/assets-category-create.component";
import { AssetsCategoryViewComponent } from "./assets-category-view/assets-category-view.component";

export const routes: Routes = [
    {
        path: '',
        component: AssetsCategoryComponent,
    },
    {
        path: 'create',
        component: AssetsCategoryCreateComponent,
    },
    {
        path: 'view/:id',
        component: AssetsCategoryViewComponent,
    },
];