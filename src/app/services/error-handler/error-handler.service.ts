import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { SnackbarService } from '../snackbar/snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor(private snackbar: SnackbarService) {}

  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      this.snackbar.error('Serverside error occured, please try again later.');
    } else if (error.status === 401) {
      this.snackbar.error('Wrong credentials.');
    } else {
      this.snackbar.error('Serverside error occured, please try again later.');
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
