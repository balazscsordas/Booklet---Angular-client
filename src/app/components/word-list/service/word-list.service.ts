import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IWord } from '../word-list.component';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class WordListService {
  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService,
  ) {}

  getWordList(page: number, searchParam: string | null) {
    return this.http
      .get<IWord[]>(`${environment.apiBaseURL}Words/GetAll`, {
        params: searchParam ? { page, searchParam } : { page },
      })
      .pipe(catchError(error => this.errorHandler.handleError(error)));
  }
}
