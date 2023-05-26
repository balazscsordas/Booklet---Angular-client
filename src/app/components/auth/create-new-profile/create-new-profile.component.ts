import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-new-profile',
  templateUrl: './create-new-profile.component.html',
})
export class CreateNewProfileComponent {
  constructor(private snackbar: SnackbarService, private http: HttpClient, private errorHandler: ErrorHandlerService, private router: Router) {}

  languageOptions = ['Hungarian', 'English', 'German'];
  loading = false;
  newProfileForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    primaryLanguage: new FormControl(null, Validators.required),
    secondaryLanguage: new FormControl(null, Validators.required),
  });

  handleSubmit() {
    const name = this.newProfileForm.getRawValue().name;
    const primaryLanguage = this.newProfileForm.getRawValue().primaryLanguage;
    const secondaryLanguage = this.newProfileForm.getRawValue().secondaryLanguage;
    if (this.newProfileForm.invalid) {
      this.snackbar.error('All of the fields are required.');
      return;
    }
    if (primaryLanguage === secondaryLanguage) {
      this.snackbar.error('Chosen languages have to be different.');
      return;
    }
    this.postProfileData(this.newProfileForm.value);
    this.newProfileForm.reset();
  }

  private postProfileData(profileData: any) {
    this.http
      .post(`${environment.apiBaseURL}Profile/AddNewProfile`, profileData)
      .pipe(catchError(error => this.errorHandler.handleError(error)))
      .subscribe(res => {
        this.router.navigateByUrl('choose-profile');
      });
  }
}
