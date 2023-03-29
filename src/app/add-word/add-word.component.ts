import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ErrorHandlerService } from '../services/error-handler/error-handler.service';
import { SnackbarService } from '../services/snackbar/snackbar.service';

@Component({
  selector: 'app-add-word',
  templateUrl: './add-word.component.html',
})
export class AddWordComponent {
  constructor(
    private http: HttpClient,
    private snackbar: SnackbarService,
    private errorHandler: ErrorHandlerService
  ) {}

  public addNewWordForm = new FormGroup({
    hun: new FormControl(''),
    eng: new FormControl(''),
  });

  handleSubmit() {
    this.postNewWord(this.addNewWordForm.value);
    this.addNewWordForm.reset();
  }

  postNewWord(FormData: any) {
    this.http
      .post(environment.apiBaseURL + 'Words/AddNewWord', FormData)
      .pipe(catchError((error) => this.errorHandler.handleError(error)))
      .subscribe((res) => {
        this.snackbar.success('Successfully added a new word.');
        console.log(res);
      });
  }
}
