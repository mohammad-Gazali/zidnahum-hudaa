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
  AddHadeethComponent,
  AddStudentComponent,
  FilesComponent,
  LogMemoComponent,
  LogComingComponent,
  LogPointsComponent,
  ReportsComponent,
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
    path: 'files',
    component: FilesComponent,
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
  {
    path: 'add-hadeeth',
    component: AddHadeethComponent,
    canActivate: [groupGuard],
    data: [Group.Hadeeth],
  },
  {
    path: 'add-student',
    component: AddStudentComponent,
    canActivate: [groupGuard],
    data: [Group.AddStudents],
  },
  {
    path: 'log-memo',
    component: LogMemoComponent,
    canActivate: [groupGuard],
    // (memo group) OR (hadeeth group)
    data: [Group.Memo, Group.Hadeeth],
  },
  {
    path: 'log-coming',
    component: LogComingComponent,
    canActivate: [groupGuard],
    data: [Group.Coming],
  },
  {
    path: 'log-points',
    component: LogPointsComponent,
    canActivate: [groupGuard],
    data: [Group.Points],
  },
  {
    path: 'reports',
    component: ReportsComponent,
    canActivate: [groupGuard],
    data: [Group.Reports],
  }
];
