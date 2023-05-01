import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { WordQuizSettingsService } from 'src/app/services/word-quiz-settings/word-quiz-settings.service';
import { environment } from 'src/environments/environment';
import { IWordInterface } from '../word-quiz.component';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WordQuizService {
  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService,
    private quizService: WordQuizSettingsService,
  ) {}

  getWord(languageFrom: string | null, randomLanguage: boolean) {
    const params = new HttpParams()
      .set('randomLanguage', randomLanguage)
      .set(
        'languageFrom',
        languageFrom === this.quizService.languageOptions?.primaryLanguage
          ? 'primaryLanguage'
          : 'secondaryLanguage',
      );
    return this.http
      .get<IWordInterface>(`${environment.apiBaseURL}Words/GetOneRandom`, {
        params,
      })
      .pipe(catchError(error => this.errorHandler.handleError(error)));
  }
}
