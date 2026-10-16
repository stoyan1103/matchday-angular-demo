import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FootballMatch } from '../../models/football-match';
import { DatePipe } from '@angular/common';
import { ScorePipe } from '../../../pipes/score.pipe';

@Component({
  selector: 'app-match-card',
  imports: [DatePipe, ScorePipe, RouterLink],
  templateUrl: './match-card.html',
  styleUrl: './match-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatchCard {
  readonly match = input.required<FootballMatch>();
  readonly favouriteToggled = output<number>();

  toggleFavourite(): void {
    this.favouriteToggled.emit(this.match().id);
  }
}
