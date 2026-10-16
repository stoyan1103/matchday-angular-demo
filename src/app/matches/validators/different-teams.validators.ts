import { ValidatorFn } from '@angular/forms';

export const differentTeamsValidator: ValidatorFn = (control) => {
  const homeTeam = control.get('homeTeam')?.value;
  const awayTeam = control.get('awayTeam')?.value;

  const normalizedHomeTeam = homeTeam?.trim().toLowerCase();
  const normalizedAwayTeam = awayTeam?.trim().toLowerCase();

  if (!normalizedHomeTeam || !normalizedAwayTeam) {
    return null; // If either team is empty, we don't validate
  }

  return normalizedHomeTeam === normalizedAwayTeam ? { sameTeams: true } : null;
};
