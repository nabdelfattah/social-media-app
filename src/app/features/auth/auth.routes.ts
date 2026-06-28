import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.component').then((c) => c.RegisterComponent),
    title: 'Register',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then((c) => c.LoginComponent),
    title: 'Login',
  },
  {
    path: 'change-password',
    loadComponent: () =>
      import('./pages/change-password//change-password.component').then(
        (c) => c.ChangePasswordComponent,
      ),
    title: 'Change Password',
  },
  {
    path: 'forget-password',
    loadComponent: () =>
      import('./pages/forget-password//forget-password.component').then(
        (c) => c.ForgetPasswordComponent,
      ),
    title: 'Forget Password',
  },
];
