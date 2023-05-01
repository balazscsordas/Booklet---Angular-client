import { Component, OnInit } from '@angular/core';
import { WordQuizSettingsService } from 'src/app/services/word-quiz-settings/word-quiz-settings.service';
import { ActivatedRoute, Router } from '@angular/router';
import { WordQuizService } from './service/word-quiz.service';

export interface IWordInterface {
  id: number;
  wordFrom: string;
  wordTo: string;
}

@Component({
  selector: 'app-word-quiz',
  templateUrl: './word-quiz.component.html',
})
export class WordQuizComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private wordQuiz: WordQuizService,
    private wordQuizSettings: WordQuizSettingsService,
  ) {}

  word: IWordInterface | undefined;
  showSolution = false;
  languageFrom = this.wordQuizSettings.settingsForm.getRawValue().languageFrom;
  randomLanguage =
    !this.wordQuizSettings.settingsForm.getRawValue().randomLanguage;

  ngOnInit() {
    this.word = this.activatedRoute.snapshot.data['word'];
  }

  getNextWord() {
    if (this.randomLanguage !== null) {
      this.showSolution = false;
      this.wordQuiz
        .getWord(this.languageFrom, this.randomLanguage)
        .subscribe(res => {
          this.word = res;
        });
    }
  }

  exitSession() {
    this.router.navigateByUrl('');
  }

  setShowSolution() {
    this.showSolution = true;
  }
}
