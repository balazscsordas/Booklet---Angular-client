import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(private auth: AuthService, private snackbar: SnackbarService) {}

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  handleSubmit() {
    if (this.auth.isEmpty(this.loginForm.value)) {
      this.snackbar.error('Both fields are required.');
    } else {
      this.auth.sendLoginCredentials(this.loginForm);
      this.loginForm.reset();
    }
  }
}
