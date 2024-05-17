import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { StudentComponent } from './pages/student/student.component';
import { nonAuthGuard } from './guards/non-auth.guard';
import { Group } from './constants/group.enum';
import { groupGuard } from './guards/group.guard';
import { AddMemoComponent } from './pages/add-memo/add-memo.component';
import { AddComingComponent } from './pages/add-coming/add-coming.component';
import { AddPointsComponent } from './pages/add-points/add-points.component';

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
