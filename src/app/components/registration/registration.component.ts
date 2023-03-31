import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
})
export class RegistrationComponent {
  constructor(private auth: AuthService, private snackbar: SnackbarService) {}

  registrationForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  handleSubmit() {
    if (this.auth.isEmpty(this.registrationForm.value)) {
      this.snackbar.error('Both fields are required.');
    } else {
      this.auth.sendRegistrationCredentials(this.registrationForm);
      this.registrationForm.reset();
    }
  }
}
