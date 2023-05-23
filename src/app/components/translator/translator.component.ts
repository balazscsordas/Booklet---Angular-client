import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { WordQuizSettingsService } from 'src/app/services/word-quiz-settings/word-quiz-settings.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-translator',
  templateUrl: './translator.component.html',
})
export class TranslatorComponent implements OnInit {
  constructor(private http: HttpClient, private snackbar: SnackbarService, private errorHandler: ErrorHandlerService, public quizService: WordQuizSettingsService) {}

  languageToOptions = [
    {
      name: 'English',
      value: 'en',
    },
    {
      name: 'Hungarian',
      value: 'hu',
    },
    {
      name: 'German',
      value: 'de',
    },
  ];

  languageFromOptions = [
    {
      name: 'Auto',
      value: 'auto',
    },
    {
      name: 'English',
      value: 'en',
    },
    {
      name: 'Hungarian',
      value: 'hu',
    },
    {
      name: 'German',
      value: 'ge',
    },
  ];

  public translatorForm = new FormGroup({
    textToTranslate: new FormControl<string | null>(null, Validators.required),
    translateFrom: new FormControl(this.languageFromOptions[0].value, Validators.required),
    translateTo: new FormControl(this.languageToOptions[0].value, Validators.required),
  });
  translatedText: string | null = null;

  ngOnInit(): void {
    if (!this.quizService.languageOptions) {
      this.quizService.getLanguageOptions();
    }
  }

  handleSubmit() {
    if (this.translatorForm.valid) {
      this.getTranslation(this.translatorForm.value);
    } else {
      this.snackbar.error('Please fill out the required fields.');
    }
  }

  private getTranslation(FormData: any) {
    this.http
      .post<{ translatedText: string }>(environment.apiBaseURL + 'word/translate', FormData)
      .pipe(catchError(error => this.errorHandler.handleError(error)))
      .subscribe(res => {
        this.translatedText = res.translatedText;
      });
  }
}
