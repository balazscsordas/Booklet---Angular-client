import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-forgotten-password-input',
  templateUrl: './forgotten-password-input.component.html',
})
export class ForgottenPasswordInputComponent {
  constructor(
    private snackbar: SnackbarService,
    private http: HttpClient,
    private errorHandler: ErrorHandlerService,
    private router: Router,
  ) {}

  showEmailSentText = false;
  forgottenPasswordForm = new FormGroup({
    email: new FormControl<string | null>(null, Validators.required),
  });

  handleSubmit() {
    if (this.forgottenPasswordForm.controls.email.errors?.['required']) {
      this.snackbar.error('Both fields are required');
      return;
    }
    this.sendEmailRequest(this.forgottenPasswordForm.getRawValue().email);
    this.forgottenPasswordForm.reset();
  }

  private sendEmailRequest(email: string | null) {
    this.http
      .post(`${environment.apiBaseURL}Email/SendNewPasswordLink`, { email })
      .pipe(catchError(error => this.errorHandler.handleError(error)))
      .subscribe(res => {
        this.showEmailSentText = true;
      });
  }
}
