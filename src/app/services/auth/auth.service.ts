import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ErrorHandlerService } from '../error-handler/error-handler.service';
import { SnackbarService } from '../snackbar/snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService,
    private snackbar: SnackbarService,
    private router: Router
  ) {}
  accessToken: string | null = null;

  sendLoginCredentials(loginForm: FormGroup) {
    this.http
      .post<{ accessToken: string }>(
        environment.apiBaseURL + 'Auth/Login',
        loginForm.value,
        {
          withCredentials: true,
        }
      )
      .pipe(catchError((error) => this.errorHandler.handleError(error)))
      .subscribe((res) => {
        this.accessToken = res.accessToken;
        this.router.navigateByUrl('');
        this.snackbar.success('Successfully logged in.');
      });
  }

  sendRegistrationCredentials(registrationForm: FormGroup) {
    this.http
      .post(
        environment.apiBaseURL + 'Auth/Registration',
        registrationForm.value
      )
      .pipe(catchError((error) => this.errorHandler.handleError(error)))
      .subscribe((res) => {
        this.router.navigateByUrl('login');
        this.snackbar.success('Registration was successful.');
      });
  }

  signOut() {
    this.accessToken = null;
    this.router.navigateByUrl('login');
  }
}
