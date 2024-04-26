import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { StudentComponent } from './pages/student/student.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'student/:id',
        component: StudentComponent,
    },
];
