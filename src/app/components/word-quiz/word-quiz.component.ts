import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ErrorHandlerService } from '../../services/error-handler/error-handler.service';
import { WordQuizSettingsService } from 'src/app/services/word-quiz-settings/word-quiz-settings.service';
import { Router } from '@angular/router';

interface WordInterface {
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
    private errorHandler: ErrorHandlerService,
    private quizService: WordQuizSettingsService,
    private router: Router,
  ) {}

  loading = true;
  word: WordInterface | undefined;
  showSolution = false;
  languageFrom = this.quizService.settingsForm.getRawValue().languageFrom;
  languageTo = this.quizService.settingsForm.getRawValue().languageTo;
  randomLanguage = this.quizService.settingsForm.getRawValue().randomLanguage;

  ngOnInit() {
    if (this.randomLanguage !== null) {
      this.getWord(this.languageFrom, this.languageTo, this.randomLanguage);
    }
  }

  getNextWord() {
    if (this.randomLanguage !== null) {
      this.getWord(this.languageFrom, this.languageTo, this.randomLanguage);
    }
  }

  exitSession() {
    this.router.navigateByUrl('');
  }

  setShowSolution() {
    this.showSolution = true;
  }

  sayWord(text: string) {
    this.getAudioUrl(text);
  }

  private getWord(
    languageFrom: string | null,
    languageTo: string | null,
    randomLanguage: boolean,
  ) {
    this.showSolution = false;
    const params = new HttpParams()
      .set('randomLanguage', randomLanguage)
      .set(
        'languageFrom',
        languageFrom === this.quizService.languageOptions?.primaryLanguage
          ? 'primaryLanguage'
          : 'secondaryLanguage',
      );
    this.http
      .get<WordInterface>(`${environment.apiBaseURL}Words/GetOneRandom`, {
        params,
      })
      .pipe(catchError(error => this.errorHandler.handleError(error)))
      .subscribe(res => {
        this.word = res;
        this.loading = false;
      });
  }

  getAudioUrl(text: string) {
    const params = new HttpParams().set('text', text);
    this.http
      .get<{ src: string }>(`${environment.apiBaseURL}Audio/GetAudioUrl`, {
        params,
      })
      .pipe(catchError(error => this.errorHandler.handleError(error)))
      .subscribe(res => {
        this.playAudio(res.src);
      });
  }

  private playAudio(src: string) {
    const audio = new Audio();
    audio.src = src;
    audio.load();
    audio.play();
  }
}
