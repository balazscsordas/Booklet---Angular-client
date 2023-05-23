import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WordDetailsService {
  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService) {}

  getWord(id: number) {
    return this.http.get(`${environment.apiBaseURL}word/getOneById/${id}`).pipe(catchError(error => this.errorHandler.handleError(error)));
  }
}
