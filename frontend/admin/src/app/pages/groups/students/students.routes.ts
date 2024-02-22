import { Routes } from "@angular/router";
import { StudentComponent } from "./student/student.component";
import { StudentViewComponent } from "./student/student-view/student-view.component";
import { StudentCreateComponent } from "./student/student-create/student-create.component";

export const routes: Routes = [
    {
        path: 'student',
        component: StudentComponent,
    },
    {
        path: 'student/view/:id',
        component: StudentViewComponent,
    },
    {
        path: 'student/create',
        component: StudentCreateComponent,
    }
];