import { Routes } from "@angular/router";
import { StudentComponent } from "./student.component";
import { StudentViewComponent } from "./student-view/student-view.component";
import { StudentCreateComponent } from "./student-create/student-create.component";

export const routes: Routes = [
    {
        path: '',
        component: StudentComponent,
    },
    {
        path: 'view/:id',
        component: StudentViewComponent,
    },
    {
        path: 'create',
        component: StudentCreateComponent,
    },   
]