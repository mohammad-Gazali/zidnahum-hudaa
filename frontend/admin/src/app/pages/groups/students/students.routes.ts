import { Routes } from '@angular/router';
import { routes as studentsRoutes } from './student/student.routes';
import { routes as categoriesRoutes } from './category/category.routes';
import { routes as groupsRoutes } from './group/group.routes';
import { routes as memorizeMessageRoutes } from './memorize-message/memorize-message.routes';
import { routes as memorizeNotesRoutes } from './memorize-notes/memorize-notes.routes';
import { AddEliteTestComponent } from './add-elite-test/add-elite-test.component';

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

  // student memorize message routes
  {
    path: 'memorize-message',
    children: memorizeMessageRoutes,
  },

  // student notes routes
  {
    path: 'memorize-notes',
    children: memorizeNotesRoutes,
  },

  // add elite test to student
  {
    path: 'add-elite-test',
    component: AddEliteTestComponent,
  }
];
