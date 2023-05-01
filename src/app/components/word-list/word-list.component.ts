import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { WordQuizSettingsService } from 'src/app/services/word-quiz-settings/word-quiz-settings.service';
import { environment } from 'src/environments/environment';

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
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private snackbar: SnackbarService,
    private errorHandler: ErrorHandlerService,
    public quizService: WordQuizSettingsService,
  ) {}

  searchParam: string | null = this.getCurrentSearchParam();
  loading = true;
  words: IWord[] | undefined;
  page: number = Number(this.route.snapshot.params['page']);
  maxPageNumber = 1;

  searchForm = new FormGroup({
    searchInput: new FormControl(this.searchParam),
  });

  ngOnInit() {
    if (!this.quizService.languageOptions) {
      this.quizService.getLanguageOptions();
    }
    this.getWordList(this.page, this.searchParam);
    this.getMaxPageNumber();
  }

  goToNextPage() {
    if (this.page < this.maxPageNumber) {
      this.page = this.page + 1;
      this.router.navigate([`/my-words/${this.page}`]);
      this.getWordList(this.page, this.searchParam);
    }
  }

  goToPrevPage() {
    if (this.page > 1) {
      this.page = this.page - 1;
      this.router.navigate([`/my-words/${this.page}`]);
      this.getWordList(this.page, this.searchParam);
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
      this.getWordList(this.page, searchInput);
    } else {
      this.snackbar.error('Please fill out the search input field.');
    }
  }

  clearSearchInput() {
    this.searchForm.reset();
    this.getWordList(this.page, null);
  }

  private getWordList(page: number, searchParam: string | null) {
    this.http
      .get<IWord[]>(`${environment.apiBaseURL}Words/GetAll`, {
        params: searchParam ? { page, searchParam } : { page },
      })
      .pipe(catchError(error => this.errorHandler.handleError(error)))
      .subscribe(res => {
        if (page > 1 && !res) {
          this.goToPrevPage();
        } else {
          this.words = res;
          this.loading = false;
        }
      });
  }

  private getMaxPageNumber() {
    this.http
      .get<number>(`${environment.apiBaseURL}Words/GetMaxPageNumber`)
      .pipe(catchError(error => this.errorHandler.handleError(error)))
      .subscribe(res => {
        this.maxPageNumber = res;
      });
  }

  private getCurrentSearchParam() {
    const searchParam = this.route.snapshot.queryParamMap.get('search');
    if (!searchParam) {
      return null;
    } else {
      return searchParam;
    }
  }
}
