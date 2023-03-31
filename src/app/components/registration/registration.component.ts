import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
})
export class RegistrationComponent {
  constructor(private auth: AuthService, private snackbar: SnackbarService) {}

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
      this.auth.sendRegistrationCredentials(this.registrationForm);
      this.registrationForm.reset();
    }
  }
}
