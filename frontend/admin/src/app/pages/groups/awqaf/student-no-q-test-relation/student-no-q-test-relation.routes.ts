import { Routes } from "@angular/router";
import { StudentNoQTestRelationComponent } from "./student-no-q-test-relation.component";
import { StudentNoQTestRelationViewComponent } from "./student-no-q-test-relation-view/student-no-q-test-relation-view.component";

export const routes: Routes = [
    {
        path: '',
        component: StudentNoQTestRelationComponent,
    },
    {
        path: 'view/:id',
        component: StudentNoQTestRelationViewComponent,
    },
];