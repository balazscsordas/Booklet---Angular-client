import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from '../services/snackbar/snackbar.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ErrorHandlerService } from '../services/error-handler/error-handler.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-initial-settings',
  templateUrl: './initial-settings.component.html',
})
export class InitialSettingsComponent {
  constructor(
    private snackbar: SnackbarService,
    private http: HttpClient,
    private errorHandler: ErrorHandlerService,
  ) {}

  languageOptions = ['Hungarian', 'English', 'German'];
  loading = false;
  initialSettingsForm = new FormGroup({
    primaryLanguage: new FormControl(null, Validators.required),
    secondaryLanguage: new FormControl(null, Validators.required),
  });

  handleSubmit() {
    const primaryLanguage =
      this.initialSettingsForm.getRawValue().primaryLanguage;
    const secondaryLanguage =
      this.initialSettingsForm.getRawValue().secondaryLanguage;
    if (this.initialSettingsForm.invalid) {
      this.snackbar.error('All of the fields are required.');
      return;
    }
    if (primaryLanguage === secondaryLanguage) {
      this.snackbar.error('Chosen languages have to be different.');
      return;
    }
    this.postSettings(this.initialSettingsForm.value);
    this.initialSettingsForm.reset();
  }

  private postSettings(settings: any) {
    this.http
      .post(`${environment.apiBaseURL}Auth/UserSettings`, settings)
      .pipe(catchError(error => this.errorHandler.handleError(error)))
      .subscribe(res => {
        this.snackbar.success('You are ready to start.');
      });
  }
}
