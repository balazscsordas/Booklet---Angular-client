import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorHandlerService } from '../error-handler/error-handler.service';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LanguageOptionsService {
  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService,
  ) {}

  languageOptions: string[] | undefined;

  getLanguageOptions() {
    this.http
      .get<string[]>(`${environment.apiBaseURL}Profile/GetLanguageOptions`)
      .pipe(catchError(error => this.errorHandler.handleError(error)))
      .subscribe(res => {
        this.languageOptions = res;
      });
  }
}
