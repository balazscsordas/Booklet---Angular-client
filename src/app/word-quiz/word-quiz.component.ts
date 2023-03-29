import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ErrorHandlerService } from '../services/error-handler/error-handler.service';

interface Words {
  id: number | undefined;
  wordFrom: string | undefined;
  wordTo: string | undefined;
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

  words: Words = {
    id: undefined,
    wordFrom: undefined,
    wordTo: undefined,
  };
  showSolution = false;

  ngOnInit() {
    this.getWord();
  }

  getWord() {
    this.showSolution = false;
    this.http
      .get<Words>(`${environment.apiBaseURL}Words/GetOneRandom`)
      .pipe(catchError((error) => this.errorHandler.handleError(error)))
      .subscribe((res) => {
        this.words = res;
      });
  }

  setShowSolution() {
    this.showSolution = true;
  }
}
