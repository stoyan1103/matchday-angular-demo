export type MatchStatus = 'scheduled' | 'live' | 'finished';

export type MatchCompetition = 'Premier League' | 'La Liga' | 'Bundesliga' | 'Serie A' | 'Ligue 1';

export interface FootballMatch {
  id: number;
  homeTeam: string;
  awayTeam: string;
  competition: MatchCompetition;
  kickoff: string;
  status: MatchStatus;
  homeScore: number | null;
  awayScore: number | null;
  isFavourite: boolean;
}

export type CreateMatchInput = Pick<
  FootballMatch,
  'homeTeam' | 'awayTeam' | 'competition' | 'kickoff'
>;
