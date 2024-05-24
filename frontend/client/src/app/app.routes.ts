import { Routes } from '@angular/router';
import { Group } from '@shared';
import { nonAuthGuard, groupGuard } from './guards';
import {
  HomeComponent,
  LoginComponent,
  StudentComponent,
  AddMemoComponent,
  AddComingComponent,
  AddPointsComponent,
} from './pages';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [nonAuthGuard],
  },
  {
    path: 'student/:id',
    component: StudentComponent,
  },
  {
    path: 'add-memo',
    component: AddMemoComponent,
    canActivate: [groupGuard],
    data: [Group.Memo],
  },
  {
    path: 'add-coming',
    component: AddComingComponent,
    canActivate: [groupGuard],
    data: [Group.Coming],
  },
  {
    path: 'add-points',
    component: AddPointsComponent,
    canActivate: [groupGuard],
    data: [Group.Points],
  },
];
