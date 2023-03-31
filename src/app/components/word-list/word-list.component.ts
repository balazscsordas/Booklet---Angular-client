import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

interface Word {
  id: number;
  hun: string;
  eng: string;
}

@Component({
  selector: 'app-word-list',
  templateUrl: './word-list.component.html',
})
export class WordListComponent implements OnInit {
  errorHandler: any;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  loading = true;
  words: Word[] | undefined;
  page: number = Number(this.route.snapshot.params['page']);
  maxPageNumber = 1;

  ngOnInit() {
    this.getWordList(this.page);
    this.getMaxPageNumber();
  }

  getWordList(page: number) {
    this.http
      .get<Word[]>(`${environment.apiBaseURL}Words/GetAll`, {
        params: { page },
      })
      .subscribe((res) => {
        this.words = res;
        this.loading = false;
      });
  }

  getMaxPageNumber() {
    this.http
      .get<number>(`${environment.apiBaseURL}Words/GetMaxPageNumber`)
      .subscribe((res) => {
        this.maxPageNumber = res;
      });
  }

  goToNextPage() {
    if (this.page < this.maxPageNumber) {
      this.page = this.page + 1;
      this.router.navigate([`/my-words/${this.page}`]);
      this.getWordList(this.page);
    }
  }

  goToPrevPage() {
    if (this.page > 1) {
      this.page = this.page - 1;
      this.router.navigate([`/my-words/${this.page}`]);
      this.getWordList(this.page);
    }
  }

  goToDetailsPage(id: number) {
    this.router.navigateByUrl(`/word/${id}`);
  }
}
