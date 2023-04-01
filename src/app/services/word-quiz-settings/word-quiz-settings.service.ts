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
  });

  disableInputsIfRandomLanguageChecked() {
    this.settingsForm
      .get('randomLanguage')
      ?.valueChanges.subscribe((checkboxValue) => {
        if (checkboxValue) {
          this.settingsForm.get('languageFrom')?.disable();
          this.settingsForm.get('languageTo')?.disable();
        } else {
          this.settingsForm.get('languageFrom')?.enable();
          this.settingsForm.get('languageTo')?.enable();
        }
      });
  }
}
