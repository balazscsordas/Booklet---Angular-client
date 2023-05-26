import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ErrorHandlerService } from '../../services/error-handler/error-handler.service';
import { SnackbarService } from '../../services/snackbar/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../dialogs/delete-dialog/delete-dialog.component';
import { WordQuizSettingsService } from 'src/app/services/word-quiz-settings/word-quiz-settings.service';

interface Form {
  id: number | null;
  primaryLanguage: string | null;
  secondaryLanguage: string | null;
}

@Component({
  selector: 'app-word-details',
  templateUrl: './word-details.component.html',
})
export class WordDetailsComponent implements OnInit {
  constructor(private http: HttpClient, private route: ActivatedRoute, private location: Location, private snackbar: SnackbarService, private errorHandler: ErrorHandlerService, private dialog: MatDialog, public quizService: WordQuizSettingsService) {}

  id: number = this.route.snapshot.params['id'];
  editWordForm = new FormGroup({
    id: new FormControl<number | null>(null),
    primaryLanguage: new FormControl<string | null>(null),
    secondaryLanguage: new FormControl<string | null>(null),
  });
  prevWordForm: Form = {
    id: null,
    primaryLanguage: null,
    secondaryLanguage: null,
  };

  ngOnInit(): void {
    if (!this.quizService.languageOptions) {
      this.quizService.getLanguageOptions();
    }
    this.editWordForm.setValue(this.route.snapshot.data['word']);
    this.prevWordForm = this.route.snapshot.data['word'];
  }

  handleSubmit() {
    if (JSON.stringify(this.prevWordForm) === JSON.stringify(this.editWordForm.value)) {
      this.snackbar.info('The data is the same.');
    } else {
      this.postEditedWord(this.editWordForm.value);
    }
  }

  openDeleteDialog(): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { id: this.id },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === this.id) {
        this.deleteWord(this.id);
      }
    });
  }

  private deleteWord(id: number) {
    this.http
      .delete(`${environment.apiBaseURL}word/${id}`)
      .pipe(catchError(error => this.errorHandler.handleError(error)))
      .subscribe(res => {
        this.location.back();
        this.snackbar.success('Successfully deleted the word.');
      });
  }

  private postEditedWord(newData: any) {
    this.http
      .put<Form>(environment.apiBaseURL + 'word', newData)
      .pipe(catchError(error => this.errorHandler.handleError(error)))
      .subscribe(res => {
        this.location.back();
        this.snackbar.success('Successfully edited the word.');
        this.prevWordForm = res;
      });
  }
}
