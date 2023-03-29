import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-word-list',
  templateUrl: './word-list.component.html',
})
export class WordListComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  words: any;
  page: number = Number(this.route.snapshot.params['page']);

  ngOnInit() {
    this.getWordList(this.page);
  }

  getWordList(page: number) {
    this.http
      .get(`${environment.apiBaseURL}Words/GetAll`, { params: { page } })
      .subscribe((res) => {
        this.words = res;
      });
  }

  goToNextPage() {
    this.page = this.page + 1;
    this.router.navigate([`/my-words/${this.page}`]);
    this.getWordList(this.page);
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