import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { authGuard } from './core/auth/guards/auth-guard';
import { guestGuard } from './core/auth/guards/guest-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, title: 'Home' },
      {
        path: 'post/:id',
        loadComponent: () =>
          import('./features/post-details/post-details.component').then(
            (c) => c.PostDetailsComponent,
          ),
        title: 'Post Details',
      },
      {
        path: 'notifications',
        loadComponent: () =>
          import('./features/notifications/notifications.component').then(
            (c) => c.NotificationsComponent,
          ),
        title: 'Notifications',
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./features/profile/profile.component').then((c) => c.ProfileComponent),
        title: 'profile',
      },
      {
        path: 'change-password',
        loadComponent: () =>
          import('./features/change-password/change-password.component').then(
            (c) => c.ChangePasswordComponent,
          ),
        title: 'Change Password',
      },
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [guestGuard],
    loadChildren: () => import('./features/auth/auth.routes').then((c) => c.routes),
  },
  { path: '**', component: NotFoundComponent, title: 'Not Found' },
];
