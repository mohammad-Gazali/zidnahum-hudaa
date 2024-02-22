import { Routes } from '@angular/router';
import { routes as studentsRoutes } from './student/student.routes';
import { routes as categoriesRoutes } from './category/category.routes';
import { routes as groupsRoutes } from './group/group.routes';

export const routes: Routes = [
  // students routes
  {
    path: 'student',
    children: studentsRoutes,
  },

  // student categories routes
  {
    path: 'student-category',
    children: categoriesRoutes,
  },

  // student groups routes
  {
    path: 'student-group',
    children: groupsRoutes,
  },
];
