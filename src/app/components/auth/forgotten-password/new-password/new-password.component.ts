import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
})
export class NewPasswordComponent implements OnInit {
  constructor(
    private snackbar: SnackbarService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private errorHandler: ErrorHandlerService,
    private router: Router,
  ) {}

  user_id: number | null = null;
  token: string = this.route.snapshot.params['token'];
  newPasswordForm = new FormGroup({
    password: new FormControl<string | null>(null, Validators.required),
    passwordAgain: new FormControl<string | null>(null, Validators.required),
  });

  ngOnInit(): void {
    this.verifyToken(this.token);
  }

  handleSubmit() {
    const password = this.newPasswordForm.getRawValue().password;
    const passwordAgain = this.newPasswordForm.getRawValue().passwordAgain;
    if (
      this.newPasswordForm.controls.password.errors?.['required'] ||
      this.newPasswordForm.controls.passwordAgain.errors?.['required']
    ) {
      this.snackbar.error('Please fill out both fields.');
      return;
    }
    if (password !== passwordAgain) {
      this.snackbar.error('Passwords do not match.');
      return;
    }
    password && this.sendNewPassword(password, this.token);
  }

  private verifyToken(token: string) {
    this.http
      .post<{ user_id: number }>(
        `${environment.apiBaseURL}Email/VerifyNewPasswordToken`,
        { token },
      )
      .pipe(catchError(error => this.errorHandler.handleError(error)))
      .subscribe(res => {
        this.user_id = res.user_id;
      });
  }

  private sendNewPassword(newPassword: string, token: string) {
    this.http
      .post(`${environment.apiBaseURL}Email/SetNewPassword`, {
        newPassword,
        token,
      })
      .pipe(catchError(error => this.errorHandler.handleError(error)))
      .subscribe(res => {
        this.router.navigateByUrl('login');
        this.snackbar.success('Your password has been changed.');
      });
  }
}
