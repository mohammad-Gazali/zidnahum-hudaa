import { Routes } from '@angular/router';
import { routes as noQTestRoutes } from './no-q-test/no-q-test.routes';
import { routes as studentNoQTestRelationRoutes } from './student-no-q-test-relation/student-no-q-test-relation.routes';
import { AddAwqafTestStudentComponent } from './add-awqaf-test-student/add-awqaf-test-student.component';

export const routes: Routes = [
  {
    path: 'no-q-test',
    children: noQTestRoutes,
  },
  {
    path: 'student-no-q-test-relation',
    children: studentNoQTestRelationRoutes,
  },
  {
    path: 'add-awqaf-test-student',
    component: AddAwqafTestStudentComponent,
  }
];
