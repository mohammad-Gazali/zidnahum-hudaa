import { Routes } from "@angular/router";
import { NewsComponent } from "./news.component";
import { NewsCreateComponent } from "./news-create/news-create.component";
import { NewsViewComponent } from "./news-view/news-view.component";

export const routes: Routes = [
    {
        path: '',
        component: NewsComponent,
    },
    {
        path: 'create',
        component: NewsCreateComponent,
    },
    {
        path: 'view/:id',
        component: NewsViewComponent,
    },
];