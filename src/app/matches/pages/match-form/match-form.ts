import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatchService } from '../../services/match.service';
import { Router, RouterLink } from '@angular/router';
import { CreateMatchInput, MatchCompetition } from '../../models/football-match';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { differentTeamsValidator } from '../../validators/different-teams.validators';

@Component({
  selector: 'app-match-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './match-form.html',
  styleUrl: './match-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatchForm {
  private readonly matchService = inject(MatchService);
  private readonly router = inject(Router);

  readonly competitions: MatchCompetition[] = [
    'Premier League',
    'La Liga',
    'Bundesliga',
    'Serie A',
    'Ligue 1',
  ];

  readonly form = new FormGroup(
    {
      homeTeam: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.pattern(/\S/)],
      }),

      awayTeam: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.pattern(/\S/)],
      }),

      competition: new FormControl<MatchCompetition>('Premier League', {
        nonNullable: true,
        validators: [Validators.required],
      }),

      kickoff: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    },
    {
      validators: [differentTeamsValidator],
    },
  );

  onSubmit(): void {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return;
    }

    const values = this.form.getRawValue();
    const kickoff = new Date(values.kickoff);

    if (isNaN(kickoff.getTime())) {
      this.form.controls.kickoff.setErrors({ invalidDate: true });
      return;
    }

    const input: CreateMatchInput = {
      homeTeam: values.homeTeam.trim(),
      awayTeam: values.awayTeam.trim(),
      competition: values.competition,
      kickoff: kickoff.toISOString(),
    };

    const id = this.matchService.addMatch(input);

    this.router.navigate(['matches', id]);
  }

  onReset(formDirective: FormGroupDirective): void {
    formDirective.resetForm();
  }
}
