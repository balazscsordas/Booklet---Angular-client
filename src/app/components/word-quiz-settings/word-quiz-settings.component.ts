import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { WordQuizSettingsService } from 'src/app/services/word-quiz-settings/word-quiz-settings.service';

@Component({
  selector: 'app-word-quiz-settings',
  templateUrl: './word-quiz-settings.component.html',
})
export class WordQuizSettingsComponent implements OnInit {
  constructor(
    private router: Router,
    private snackbar: SnackbarService,
    public quizService: WordQuizSettingsService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.quizService.languageOptions =
      this.activatedRoute.snapshot.data['languageOptions'];
    this.quizService.disableInputsIfRandomLanguageChecked();
  }

  handleSubmit() {
    if (this.quizService.settingsForm.invalid) {
      this.snackbar.error('All of the fields are required.');
      return;
    }
    if (this.quizService.settingsForm.value.randomLanguage === false) {
      if (
        this.quizService.settingsForm.value.languageFrom ===
        this.quizService.settingsForm.value.languageTo
      ) {
        this.snackbar.error(
          "'Language From' and 'Language To' fields can't be equal.",
        );
        return;
      }
    }
    this.router.navigateByUrl('practice');
  }
}
