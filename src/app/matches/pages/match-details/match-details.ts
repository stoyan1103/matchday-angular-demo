import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MatchService } from '../../services/match.service';
import { DatePipe } from '@angular/common';
import { ScorePipe } from '../../../pipes/score.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-match-details',
  imports: [DatePipe, RouterLink, ScorePipe],
  templateUrl: './match-details.html',
  styleUrl: './match-details.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatchDetails {
  private readonly matchService = inject(MatchService);

  readonly id = input.required<string>();
  readonly match = computed(() => {
    const matchId = Number(this.id());
    return this.matchService.matches().find((match) => match.id === matchId);
  });

  toggleFavourite(): void {
    const match = this.match();

    if (match) {
      this.matchService.toggleFavourite(match.id);
    }
  }
}
