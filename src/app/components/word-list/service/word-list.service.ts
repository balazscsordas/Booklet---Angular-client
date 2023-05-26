import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IWord } from '../word-list.component';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class WordListService {
  constructor(private http: HttpClient, private snackbar: SnackbarService, private errorHandler: ErrorHandlerService) {}

  getWordList(wordListId: number, page: number, searchParam: string | null) {
    return this.http
      .get<IWord[]>(`${environment.apiBaseURL}word/wordListId/${wordListId}`, {
        params: searchParam ? { page, searchParam } : { page },
      })
      .pipe(catchError(error => this.errorHandler.handleError(error)));
  }

  postNewWord(FormData: any) {
    return this.http.post<IWord>(`${environment.apiBaseURL}word`, FormData).pipe(catchError(error => this.errorHandler.handleError(error)));
  }
}
