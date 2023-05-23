import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { IWordInterface } from '../word-quiz.component';
import { WordQuizService } from '../service/word-quiz.service';
import { WordQuizSettingsService } from 'src/app/services/word-quiz-settings/word-quiz-settings.service';

@Injectable({
  providedIn: 'root',
})
export class WordQuizResolver implements Resolve<IWordInterface> {
  constructor(private wordQuiz: WordQuizService, private wordQuizSettings: WordQuizSettingsService) {}

  languageFrom = this.wordQuizSettings.settingsForm.getRawValue().languageFrom;
  randomLanguage = this.wordQuizSettings.settingsForm.getRawValue().randomLanguage;

  resolve(): Observable<IWordInterface> {
    if (this.randomLanguage) {
      return this.wordQuiz.getWord(this.languageFrom, this.randomLanguage);
    } else {
      return this.wordQuiz.getWord(this.languageFrom, false);
    }
  }
}
