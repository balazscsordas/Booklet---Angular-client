import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class WordQuizSettingsService {
  constructor() {}

  settingsForm = new FormGroup({
    languageFrom: new FormControl<string | null>(null, Validators.required),
    languageTo: new FormControl<string | null>(null, Validators.required),
    randomLanguage: new FormControl<boolean>(false),
    secPerWord: new FormControl<number | null>(null, Validators.required),
    numberOfWords: new FormControl<number | null>(null, [
      Validators.required,
      Validators.pattern(/^[0-9]*$/),
    ]),
  });
}
