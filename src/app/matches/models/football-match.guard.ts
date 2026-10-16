import { FootballMatch } from './football-match';

export function isFootballMatch(value: unknown): value is FootballMatch {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const match = value as Record<string, unknown>;

  return (
    typeof match['id'] === 'number' &&
    Number.isSafeInteger(match['id']) &&
    match['id'] > 0 &&
    typeof match['homeTeam'] === 'string' &&
    match['homeTeam'].trim().length > 0 &&
    typeof match['awayTeam'] === 'string' &&
    match['awayTeam'].trim().length > 0 &&
    (match['competition'] === 'Premier League' ||
      match['competition'] === 'La Liga' ||
      match['competition'] === 'Bundesliga' ||
      match['competition'] === 'Serie A' ||
      match['competition'] === 'Ligue 1') &&
    typeof match['kickoff'] === 'string' &&
    Number.isFinite(Date.parse(match['kickoff'])) &&
    (match['status'] === 'scheduled' ||
      match['status'] === 'live' ||
      match['status'] === 'finished') &&
    isScore(match['homeScore']) &&
    isScore(match['awayScore']) &&
    typeof match['isFavourite'] === 'boolean'
  );
}

function isScore(value: unknown): boolean {
  return value === null || (typeof value === 'number' && Number.isSafeInteger(value) && value >= 0);
}
