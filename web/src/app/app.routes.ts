import { Routes } from '@angular/router';
import { AuthGuard } from './modules/core/guards/auth.guard';

export const routes: Routes = [
    { path: 'login', loadComponent: () => import('./modules/auth/pages/login/login.component').then(c => c.LoginComponent) },
    {
        path: 'map',
        loadComponent: () => import('./modules/cesium-map/pages/map-container/map-container.component').then(c => c.MapContainerComponent),
        canActivate: [AuthGuard]
    },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
];