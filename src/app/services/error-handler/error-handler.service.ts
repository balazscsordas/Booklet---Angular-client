import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { SnackbarService } from '../snackbar/snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor(private snackbar: SnackbarService) {}

  handleError(errorResponse: HttpErrorResponse) {
    console.log(errorResponse);
    if (errorResponse.status !== 0) {
      this.snackbar.error(errorResponse.error.message);
    } else {
      this.snackbar.error('Serverside error occured, please try again later.');
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.'),
    );
  }
}
