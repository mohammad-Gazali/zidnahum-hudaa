import { Routes } from '@angular/router';
import { Group } from '@shared';
import { authGuard, groupGuard } from './guards';
import { HomeComponent } from './pages/home/home.component';
import { StudentComponent } from './pages/student/student.component';
import { FilesComponent } from './pages/files/files.component';
import { NewsComponent } from './pages/news/news.component';
import { AddMemoComponent } from './pages/add-memo/add-memo.component';
import { AddComingComponent } from './pages/add-coming/add-coming.component';
import { AddPointsComponent } from './pages/add-points/add-points.component';
import { AddHadeethComponent } from './pages/add-hadeeth/add-hadeeth.component';
import { AddStudentComponent } from './pages/add-student/add-student.component';
import { LogMemoComponent } from './pages/log-memo/log-memo.component';
import { LogComingComponent } from './pages/log-coming/log-coming.component';
import { LogPointsComponent } from './pages/log-points/log-points.component';
import { ReportsComponent } from './pages/reports/reports.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'student/:id', component: StudentComponent },
  { path: 'files', component: FilesComponent },
  { path: 'news', component: NewsComponent },
  { path: 'add-memo', component: AddMemoComponent, canActivate: [groupGuard], data: [Group.Memo] },
  { path: 'add-coming', component: AddComingComponent, canActivate: [groupGuard], data: [Group.Coming] },
  { path: 'add-points', component: AddPointsComponent, canActivate: [groupGuard], data: [Group.Points] },
  { path: 'add-hadeeth', component: AddHadeethComponent, canActivate: [groupGuard], data: [Group.Hadeeth] },
  { path: 'add-student', component: AddStudentComponent, canActivate: [groupGuard], data: [Group.AddStudents] },
  { path: 'log-memo', component: LogMemoComponent, canActivate: [groupGuard], data: [Group.Memo, Group.Hadeeth] },
  { path: 'log-coming', component: LogComingComponent, canActivate: [groupGuard], data: [Group.Coming] },
  { path: 'log-points', component: LogPointsComponent, canActivate: [groupGuard], data: [Group.Points] },
  { path: 'reports', component: ReportsComponent, canActivate: [groupGuard], data: [Group.Reports] },
];
