import { Routes } from '@angular/router';
import { nonAuthGuard } from '@shared';
import { adminGuard } from '@shared';
import { LoginComponent } from './common/login/login.component';
import { NotFoundComponent } from './common/not-found/not-found.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [nonAuthGuard] },
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadChildren: () => import('./features/admin/admin.routes').then(m => m.routes),
  },
  {
    path: '',
    loadChildren: () => import('./features/client/client.routes').then(m => m.routes),
  },
  { path: '**', component: NotFoundComponent },
];
