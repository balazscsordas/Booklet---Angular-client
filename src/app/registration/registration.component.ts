import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ErrorHandlerService } from '../services/error-handler/error-handler.service';
import { SnackbarService } from '../services/snackbar/snackbar.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
})
export class RegistrationComponent {
  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService,
    private snackbar: SnackbarService,
    private router: Router
  ) {}

  registrationForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  handleSubmit() {
    this.sendRegistrationCredentials(this.registrationForm);
    this.registrationForm.reset();
  }

  private sendRegistrationCredentials(registrationForm: FormGroup) {
    this.http
      .post(
        environment.apiBaseURL + 'Auth/Registration',
        registrationForm.value
      )
      .pipe(catchError((error) => this.errorHandler.handleError(error)))
      .subscribe((res) => {
        this.router.navigateByUrl('login');
        this.snackbar.success('Registration was successfull.');
        console.log(res);
      });
  }
}
