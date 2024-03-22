import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { routes as studentsRoutes } from './pages/groups/students/students.routes';
import { routes as authRoutes } from './pages/groups/auth/auth.routes';
import { routes as pointsRoutes } from './pages/groups/points/points.routes';
import { routes as comingsRoutes } from './pages/groups/comings/comings.routes';
import { routes as awqafRoutes } from './pages/groups/awqaf/awqaf.routes';
import { routes as globalsRoutes } from './pages/groups/globals/globals.routes';

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
        path: 'students',
        children: studentsRoutes,
    },
    {
        path: 'auth',
        children: authRoutes,
    },
    {
        path: 'points',
        children: pointsRoutes,
    },
    {
        path: 'comings',
        children: comingsRoutes,
    },
    {
        path: 'awqaf',
        children: awqafRoutes,
    },
    {
        path: 'globals',
        children: globalsRoutes,
    }
];
