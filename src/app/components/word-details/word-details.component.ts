import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ErrorHandlerService } from '../../services/error-handler/error-handler.service';
import { SnackbarService } from '../../services/snackbar/snackbar.service';

interface Form {
  id: number | null;
  hun: string | null;
  eng: string | null;
}

@Component({
  selector: 'app-word-details',
  templateUrl: './word-details.component.html',
})
export class WordDetailsComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private location: Location,
    private snackbar: SnackbarService,
    private errorHandler: ErrorHandlerService
  ) {}

  id: number = this.route.snapshot.params['id'];
  word: any;
  editWordForm = new FormGroup({
    id: new FormControl(0),
    hun: new FormControl(''),
    eng: new FormControl(''),
  });
  prevWordForm: Form = {
    id: null,
    hun: null,
    eng: null,
  };

  ngOnInit(): void {
    this.getWord(this.id);
  }

  private getWord(id: number) {
    this.http
      .get(`${environment.apiBaseURL}Words/GetOneById/${id}`)
      .subscribe((res: any) => {
        this.editWordForm.setValue(res);
        this.prevWordForm = res;
      });
  }

  deleteWord(id: number) {
    this.http
      .delete(`${environment.apiBaseURL}Words/DeleteOneById/${id}`)
      .pipe(catchError((error) => this.errorHandler.handleError(error)))
      .subscribe((res) => {
        this.location.back();
        this.snackbar.success('Successfully deleted the word.');
      });
  }

  private postEditedWord(newData: any) {
    this.http
      .put<Form>(environment.apiBaseURL + 'Words/EditWord', newData)
      .pipe(catchError((error) => this.errorHandler.handleError(error)))
      .subscribe((res) => {
        console.log(res);
        this.snackbar.success('Successfully edited the word.');
        this.prevWordForm = res;
      });
  }

  handleSubmit() {
    if (
      JSON.stringify(this.prevWordForm) ===
      JSON.stringify(this.editWordForm.value)
    ) {
      this.snackbar.info('The data is the same.');
    } else {
      this.postEditedWord(this.editWordForm.value);
    }
  }
}
