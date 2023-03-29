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
      console.error('An error occurred:', error.error);
    } else {
      this.snackbar.error('Serverside error occured, please try again later.');
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }

    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
