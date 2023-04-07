import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { WordQuizSettingsService } from 'src/app/services/word-quiz-settings/word-quiz-settings.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-word-quiz-settings',
  templateUrl: './word-quiz-settings.component.html',
})
export class WordQuizSettingsComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private router: Router,
    private errorHandler: ErrorHandlerService,
    private snackbar: SnackbarService,
    public quizService: WordQuizSettingsService,
  ) {}

  languageOptions: string[] | undefined;

  ngOnInit(): void {
    this.getLanguageOptions();
    this.quizService.disableInputsIfRandomLanguageChecked();
  }

  handleSubmit() {
    if (this.quizService.settingsForm.invalid) {
      this.snackbar.error('All of the fields are required.');
      return;
    }
    if (this.quizService.settingsForm.value.randomLanguage === false) {
      if (
        this.quizService.settingsForm.value.languageFrom ===
        this.quizService.settingsForm.value.languageTo
      ) {
        this.snackbar.error(
          "'Language From' and 'Language To' fields can't be equal.",
        );
        return;
      }
    }
    this.router.navigateByUrl('practice');
  }

  private getLanguageOptions() {
    this.http
      .get<string[]>(`${environment.apiBaseURL}Words/GetLanguageOptions`)
      .pipe(catchError(error => this.errorHandler.handleError(error)))
      .subscribe(res => {
        this.languageOptions = res;
      });
  }
}
