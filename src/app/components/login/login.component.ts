import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(private auth: AuthService, private snackbar: SnackbarService) {}

  loginForm = new FormGroup({
    email: new FormControl<string | null>(null, Validators.required),
    password: new FormControl<string | null>(null, [Validators.required]),
  });

  handleSubmit() {
    if (
      this.loginForm.controls.email.errors?.['required'] ||
      this.loginForm.controls.password.errors?.['required']
    ) {
      this.snackbar.error('Both fields are required');
    }
    if (
      !this.loginForm.controls.email.errors &&
      !this.loginForm.controls.password.errors
    ) {
      this.auth.sendLoginCredentials(this.loginForm);
      this.loginForm.reset();
    }
  }

  testUserLogin() {
    this.loginForm.setValue({ email: 'test@test.com', password: 'lacika1996' });
    this.auth.sendLoginCredentials(this.loginForm);
    this.loginForm.reset();
  }
}
