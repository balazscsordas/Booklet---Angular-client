import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { WordQuizSettingsService } from 'src/app/services/word-quiz-settings/word-quiz-settings.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-word-dialog',
  templateUrl: './add-word-dialog.component.html',
})
export class AddWordDialogComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<AddWordDialogComponent>, private activatedRoute: ActivatedRoute, private snackbar: SnackbarService, public quizService: WordQuizSettingsService) {}

  public addNewWordForm = new FormGroup({
    primaryLanguage: new FormControl('', Validators.required),
    secondaryLanguage: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    console.log(this.addNewWordForm.value);
    if (!this.quizService.languageOptions) {
      this.quizService.getLanguageOptions();
    }
  }

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  handleSubmit() {
    if (this.addNewWordForm.valid) {
      this.dialogRef.close(this.addNewWordForm.value);
    } else {
      this.snackbar.info('Both fields are required.');
    }
  }
}
