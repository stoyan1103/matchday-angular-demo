import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'matches',
  },
  {
    path: 'matches',
    loadChildren: () => import('./matches/matches.routes').then((m) => m.MATCH_ROUTES),
  },
  {
    path: 'errors',
    loadChildren: () => import('./errors/errors.routes').then((m) => m.ERROR_ROUTES),
  },
  {
    path: '**',
    redirectTo: 'errors/not-found',
  },
];
