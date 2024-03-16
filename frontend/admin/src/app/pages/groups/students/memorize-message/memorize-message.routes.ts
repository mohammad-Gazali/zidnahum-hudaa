import { Routes } from "@angular/router";
import { MemorizeMessageComponent } from "./memorize-message.component";
import { MemorizeMessageViewComponent } from "./memorize-message-view/memorize-message-view.component";

export const routes: Routes = [
    {
        path: '',
        component: MemorizeMessageComponent,
    },
    {
        path: 'view/:id',
        component: MemorizeMessageViewComponent,
    },
];