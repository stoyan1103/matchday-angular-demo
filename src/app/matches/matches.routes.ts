import { Routes } from '@angular/router';

export const MATCH_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/dashboard/dashboard').then((m) => m.Dashboard),
  },
  {
    path: 'new',
    loadComponent: () => import('./pages/match-form/match-form').then((m) => m.MatchForm),
  },
  {
    path: ':id',
    loadComponent: () => import('./pages/match-details/match-details').then((m) => m.MatchDetails),
  },
];
