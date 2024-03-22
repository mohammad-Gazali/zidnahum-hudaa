import { Routes } from "@angular/router";
import { AssetsFileComponent } from "./assets-file.component";
import { AssetsFileCreateComponent } from "./assets-file-create/assets-file-create.component";
import { AssetsFileViewComponent } from "./assets-file-view/assets-file-view.component";

export const routes: Routes = [
    {
        path: '',
        component: AssetsFileComponent,
    },
    {
        path: 'create',
        component: AssetsFileCreateComponent,
    },
    {
        path: 'view/:id',
        component: AssetsFileViewComponent,
    },
];