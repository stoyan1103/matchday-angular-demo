import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MatchCard } from '../../components/match-card/match-card';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';
import { MatchService } from '../../services/match.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [MatchCard, ReactiveFormsModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard {
  private readonly matchService = inject(MatchService);

  readonly matches = this.matchService.matches;
  readonly totalMatches = computed(() => this.matches().length);
  readonly liveMatchesCount = computed(
    () => this.matches().filter((match) => match.status === 'live').length,
  );
  readonly favouriteMatchesCount = computed(
    () => this.matches().filter((match) => match.isFavourite).length,
  );

  readonly teamSearchControl = new FormControl('', {
    nonNullable: true,
  });
  readonly searchTeamQuery = toSignal(
    this.teamSearchControl.valueChanges.pipe(
      map((value) => value.trim().toLowerCase()),
      debounceTime(250),
      distinctUntilChanged(),
    ),
    { initialValue: '' },
  );

  readonly favouritesOnly = signal(false);
  readonly visibleMatches = computed(() => {
    const query = this.searchTeamQuery();
    const favouritesOnly = this.favouritesOnly();

    return this.matches().filter((match) => {
      const matchesFavourites = !favouritesOnly || match.isFavourite;
      const matchesSearch =
        match.homeTeam.toLowerCase().includes(query) ||
        match.awayTeam.toLowerCase().includes(query);

      return matchesFavourites && matchesSearch;
    });
  });

  toggleFavouritesFilter(): void {
    this.favouritesOnly.update((value) => !value);
  }

  onFavouriteToggled(id: number): void {
    this.matchService.toggleFavourite(id);
  }
}
