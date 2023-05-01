import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorHandlerService } from '../error-handler/error-handler.service';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

export interface ILanguageOptions {
  primaryLanguage: string;
  secondaryLanguage: string;
}

@Injectable({
  providedIn: 'root',
})
export class WordQuizSettingsService {
  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService,
  ) {}

  settingsForm = new FormGroup({
    languageFrom: new FormControl<string | null>(null, Validators.required),
    languageTo: new FormControl<string | null>(null, Validators.required),
    randomLanguage: new FormControl<boolean>(false),
  });
  languageOptions: ILanguageOptions | undefined;

  disableInputsIfRandomLanguageChecked() {
    this.settingsForm
      .get('randomLanguage')
      ?.valueChanges.subscribe(checkboxValue => {
        if (checkboxValue) {
          this.settingsForm.get('languageFrom')?.disable();
          this.settingsForm.get('languageFrom')?.setValue('');
          this.settingsForm.get('languageTo')?.disable();
          this.settingsForm.get('languageTo')?.setValue('');
        } else {
          this.settingsForm.get('languageFrom')?.enable();
          this.settingsForm.get('languageTo')?.enable();
        }
      });
  }

  getLanguageOptions() {
    this.http
      .get<ILanguageOptions>(
        `${environment.apiBaseURL}Profile/GetLanguageOptions`,
      )
      .pipe(catchError(error => this.errorHandler.handleError(error)))
      .subscribe(res => {
        this.languageOptions = res;
      });
  }
}
