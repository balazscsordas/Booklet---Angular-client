import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private _snackBar: MatSnackBar) {}

  private horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  private verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  error(message: string) {
    return this._snackBar.open(message, undefined, {
      duration: 3000,
      panelClass: ['snackbar-error'],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  success(message: string) {
    return this._snackBar.open(message, undefined, {
      duration: 3000,
      panelClass: ['snackbar-success'],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  info(message: string) {
    return this._snackBar.open(message, undefined, {
      duration: 3000,
      panelClass: ['snackbar-info'],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
