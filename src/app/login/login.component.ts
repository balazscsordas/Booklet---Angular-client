import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ErrorHandlerService } from '../services/error-handler/error-handler.service';
import { SnackbarService } from '../services/snackbar/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService,
    private snackbar: SnackbarService,
    private router: Router
  ) {}

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  handleSubmit() {
    this.sendLoginCredentials(this.loginForm);
    this.loginForm.reset();
  }

  private sendLoginCredentials(loginForm: FormGroup) {
    this.http
      .post(environment.apiBaseURL + 'Auth/Login', loginForm.value)
      .pipe(catchError((error) => this.errorHandler.handleError(error)))
      .subscribe((res) => {
        this.router.navigateByUrl('');
        this.snackbar.success('Successfully logged in.');
        console.log(res);
      });
  }
}
