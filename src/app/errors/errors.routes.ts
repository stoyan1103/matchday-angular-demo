import { Routes } from '@angular/router';

export const ERROR_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'not-found',
  },
  {
    path: 'not-found',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFoundPage),
  },
];
