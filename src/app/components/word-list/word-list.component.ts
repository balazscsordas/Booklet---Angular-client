import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError } from 'rxjs';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { WordQuizSettingsService } from 'src/app/services/word-quiz-settings/word-quiz-settings.service';
import { environment } from 'src/environments/environment';
import { WordListService } from './service/word-list.service';
import { MatDialog } from '@angular/material/dialog';
import { AddWordDialogComponent } from '../dialogs/add-word-dialog/add-word-dialog.component';

export interface IWord {
  id: number;
  primaryLanguage: string;
  secondaryLanguage: string;
}

@Component({
  selector: 'app-word-list',
  templateUrl: './word-list.component.html',
})
export class WordListComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: SnackbarService,
    private errorHandler: ErrorHandlerService,
    public quizSettingsService: WordQuizSettingsService,
    private wordListService: WordListService,
  ) {}

  searchParam: string | null = this.getCurrentSearchParam();
  words: IWord[] = this.activatedRoute.snapshot.data['words'];
  page: number = Number(this.activatedRoute.snapshot.params['page']);
  wordListId: number = Number(this.activatedRoute.snapshot.params['wordListId']);
  maxPageNumber = 1;

  searchForm = new FormGroup({
    searchInput: new FormControl(this.searchParam),
  });

  ngOnInit() {
    if (!this.quizSettingsService.languageOptions) {
      this.quizSettingsService.getLanguageOptions();
    }
    this.getMaxPageNumber();
  }

  openAddWordDialog(): void {
    const dialogRef = this.dialog.open(AddWordDialogComponent);

    dialogRef.afterClosed().subscribe(newWordData => {
      if (newWordData) {
        const newWordDataWithWordListId = {
          ...newWordData,
          word_list_id: this.wordListId,
        };
        this.wordListService.postNewWord(newWordDataWithWordListId).subscribe(newWord => {
          this.snackbar.success('Successfully added a new word.');
          this.words.push(newWord);
        });
      }
    });
  }

  goToNextPage() {
    if (this.page < this.maxPageNumber) {
      this.page = this.page + 1;
      this.router.navigate([`/my-lists/${this.wordListId}/${this.page}`]);
      this.wordListService.getWordList(this.wordListId, this.page, this.searchParam).subscribe(res => {
        this.words = res;
      });
    }
  }

  goToPrevPage() {
    if (this.page > 1) {
      this.page = this.page - 1;
      this.router.navigate([`/my-lists/${this.wordListId}/${this.page}`]);
      this.wordListService.getWordList(this.wordListId, this.page, this.searchParam).subscribe(res => {
        this.words = res;
      });
    }
  }

  goToDetailsPage(id: number) {
    this.router.navigateByUrl(`/word/${id}`);
  }

  searchSubmit() {
    const searchInput = this.searchForm.getRawValue().searchInput;
    const currentSearchParam = this.getCurrentSearchParam();
    if (currentSearchParam || searchInput) {
      const queryParams = { search: searchInput };
      this.router.navigate([], {
        queryParams: queryParams,
        queryParamsHandling: 'merge',
      });
      this.searchParam = searchInput;
      this.wordListService.getWordList(this.wordListId, this.page, searchInput).subscribe(res => {
        this.words = res;
      });
    } else {
      this.snackbar.error('Please fill out the search input field.');
    }
  }

  clearSearchInput() {
    this.searchForm.reset();
    this.wordListService.getWordList(this.wordListId, this.page, null).subscribe(res => {
      this.words = res;
    });
  }

  private getMaxPageNumber() {
    this.http
      .get<number>(`${environment.apiBaseURL}word/maxPageNumber`)
      .pipe(catchError(error => this.errorHandler.handleError(error)))
      .subscribe(res => {
        this.maxPageNumber = res;
      });
  }

  private getCurrentSearchParam() {
    const searchParam = this.activatedRoute.snapshot.queryParamMap.get('search');
    if (!searchParam) {
      return null;
    } else {
      return searchParam;
    }
  }
}
