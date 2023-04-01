import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { WordQuizSettingsService } from 'src/app/services/word-quiz-settings/word-quiz-settings.service';

@Injectable({
  providedIn: 'root',
})
export class WordQuizGuard implements CanActivate {
  constructor(
    private quizSettings: WordQuizSettingsService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.quizSettings.settingsForm.invalid) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
