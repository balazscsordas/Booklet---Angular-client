import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ErrorHandlerService } from '../../services/error-handler/error-handler.service';

interface Word {
  id: number;
  wordFrom: string;
  wordTo: string;
}

@Component({
  selector: 'app-word-quiz',
  templateUrl: './word-quiz.component.html',
})
export class WordQuizComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) {}

  loading = true;
  word: Word | undefined;
  showSolution = false;

  ngOnInit() {
    this.getWord();
  }

  getWord() {
    this.showSolution = false;
    this.http
      .get<Word>(`${environment.apiBaseURL}Words/GetOneRandom`, {
        withCredentials: true,
      })
      .pipe(catchError((error) => this.errorHandler.handleError(error)))
      .subscribe((res) => {
        this.word = res;
        this.loading = false;
      });
  }

  setShowSolution() {
    this.showSolution = true;
  }
}
