import { FootballMatch } from '../models/football-match';

export const MOCK_MATCHES: FootballMatch[] = [
  {
    id: 1,
    homeTeam: 'Manchester United',
    awayTeam: 'Liverpool',
    competition: 'Premier League',
    kickoff: '2024-06-15T15:00:00Z',
    status: 'scheduled',
    homeScore: null,
    awayScore: null,
    isFavourite: true,
  },
  {
    id: 2,
    homeTeam: 'Real Madrid',
    awayTeam: 'Barcelona',
    competition: 'La Liga',
    kickoff: '2024-06-16T18:00:00Z',
    status: 'live',
    homeScore: 2,
    awayScore: 1,
    isFavourite: false,
  },
  {
    id: 3,
    homeTeam: 'Bayern Munich',
    awayTeam: 'Borussia Dortmund',
    competition: 'Bundesliga',
    kickoff: '2024-06-17T20:00:00Z',
    status: 'finished',
    homeScore: 3,
    awayScore: 2,
    isFavourite: true,
  },
];
