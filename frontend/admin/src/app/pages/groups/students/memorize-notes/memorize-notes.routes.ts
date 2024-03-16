import { Routes } from "@angular/router";
import { MemorizeNotesComponent } from "./memorize-notes.component";
import { MemorizeNotesViewComponent } from "./memorize-notes-view/memorize-notes-view.component";

export const routes: Routes = [
    {
        path: '',
        component: MemorizeNotesComponent,
    },
    {
        path: 'view/:id',
        component: MemorizeNotesViewComponent,
    },
];