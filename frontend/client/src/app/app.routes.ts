import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { StudentComponent } from './pages/student/student.component';
import { nonAuthGuard } from './guards/non-auth.guard';

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
];
