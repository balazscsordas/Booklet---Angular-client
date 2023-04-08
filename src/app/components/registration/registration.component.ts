import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
})
export class RegistrationComponent {
  constructor(
    private auth: AuthService,
    private snackbar: SnackbarService,
    private http: HttpClient,
    private router: Router,
    private errorHandler: ErrorHandlerService,
  ) {}

  registrationForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.minLength(6),
      Validators.required,
    ]),
  });

  handleSubmit() {
    if (
      this.registrationForm.controls.email.errors?.['required'] ||
      this.registrationForm.controls.password.errors?.['required']
    ) {
      this.snackbar.error('Both fields are required');
    }
    if (
      !this.registrationForm.controls.email.errors &&
      !this.registrationForm.controls.password.errors
    ) {
      this.sendRegistrationCredentials(this.registrationForm);
      this.registrationForm.reset();
    }
  }

  private sendRegistrationCredentials(registrationForm: FormGroup) {
    this.http
      .post(
        environment.apiBaseURL + 'Auth/Registration',
        registrationForm.value,
      )
      .pipe(catchError(error => this.errorHandler.handleError(error)))
      .subscribe(res => {
        this.router.navigateByUrl('login');
        this.snackbar.success('Registration was successful.');
      });
  }
}
