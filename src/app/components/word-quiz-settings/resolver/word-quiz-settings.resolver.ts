import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, catchError } from 'rxjs';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { ILanguageOptions } from 'src/app/services/word-quiz-settings/word-quiz-settings.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WordQuizSettingsResolver implements Resolve<ILanguageOptions> {
  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService,
  ) {}

  resolve(): Observable<ILanguageOptions> {
    return this.http
      .get<ILanguageOptions>(
        `${environment.apiBaseURL}Profile/GetLanguageOptions`,
      )
      .pipe(catchError(error => this.errorHandler.handleError(error)));
  }
}
