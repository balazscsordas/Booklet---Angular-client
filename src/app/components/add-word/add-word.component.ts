import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ErrorHandlerService } from '../../services/error-handler/error-handler.service';
import { SnackbarService } from '../../services/snackbar/snackbar.service';
import { WordQuizSettingsService } from 'src/app/services/word-quiz-settings/word-quiz-settings.service';

@Component({
  selector: 'app-add-word',
  templateUrl: './add-word.component.html',
})
export class AddWordComponent implements OnInit {
  constructor(private http: HttpClient, private snackbar: SnackbarService, private errorHandler: ErrorHandlerService, public quizService: WordQuizSettingsService) {}

  public addNewWordForm = new FormGroup({
    primaryLanguage: new FormControl(''),
    secondaryLanguage: new FormControl(''),
  });

  ngOnInit(): void {
    if (!this.quizService.languageOptions) {
      this.quizService.getLanguageOptions();
    }
  }

  handleSubmit() {
    if (this.addNewWordForm.value.secondaryLanguage !== '' && this.addNewWordForm.value.primaryLanguage !== '') {
      this.postNewWord(this.addNewWordForm.value);
      this.addNewWordForm.reset();
    } else {
      this.snackbar.info('Both fields are required.');
    }
  }

  private postNewWord(FormData: any) {
    this.http
      .post(environment.apiBaseURL + 'word', FormData)
      .pipe(catchError(error => this.errorHandler.handleError(error)))
      .subscribe(res => {
        this.snackbar.success('Successfully added a new word.');
        console.log(res);
      });
  }
}
