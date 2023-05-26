import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { environment } from 'src/environments/environment';
import { IWordList } from '../my-word-lists.component';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class MyWordListsService {
  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService, private snackbar: SnackbarService) {}

  getWordLists() {
    return this.http.get<IWordList[]>(`${environment.apiBaseURL}word-list/all`).pipe(catchError(error => this.errorHandler.handleError(error)));
  }

  postWordList(newWordListData: any): Observable<IWordList> {
    return this.http.post<IWordList>(`${environment.apiBaseURL}word-list`, newWordListData).pipe(catchError(error => this.errorHandler.handleError(error)));
  }
}
