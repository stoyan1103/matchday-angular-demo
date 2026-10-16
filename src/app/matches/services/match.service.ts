import { effect, inject, Injectable, signal } from '@angular/core';
import { CreateMatchInput, FootballMatch } from '../models/football-match';
import { MOCK_MATCHES } from '../data/mock-matches';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { isFootballMatch } from '../models/football-match.guard';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  private readonly localStorageService = inject(LocalStorageService);
  private readonly localStorageKey = 'matchday.matches.v1';

  private readonly matchesState = signal<FootballMatch[]>(this.loadMatches());

  readonly matches = this.matchesState.asReadonly();

  constructor() {
    effect(() => {
      const matches = this.matchesState();

      this.localStorageService.write(this.localStorageKey, matches);
    });
  }

  toggleFavourite(id: number): void {
    this.matchesState.update((matches) =>
      matches.map((match) =>
        match.id === id ? { ...match, isFavourite: !match.isFavourite } : match,
      ),
    );
  }

  addMatch(input: CreateMatchInput): number {
    const id = Math.max(0, ...this.matchesState().map((match) => match.id)) + 1;

    const match: FootballMatch = {
      ...input,
      id,
      status: 'scheduled',
      homeScore: null,
      awayScore: null,
      isFavourite: false,
    };

    this.matchesState.update((matches) => [...matches, match]);

    return id;
  }

  private loadMatches(): FootballMatch[] {
    const savedMatches = this.localStorageService.read(this.localStorageKey);

    if (Array.isArray(savedMatches) && savedMatches.every(isFootballMatch)) {
      const ids = savedMatches.map((match) => match.id);

      if (new Set(ids).size === ids.length) {
        return savedMatches;
      }
    }

    return MOCK_MATCHES.map((match) => ({ ...match }));
  }
}
