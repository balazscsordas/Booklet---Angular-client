import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IWord } from '../word-list.component';
import { WordListService } from '../service/word-list.service';

@Injectable({
  providedIn: 'root',
})
export class WordListResolver implements Resolve<IWord[]> {
  constructor(private wordListService: WordListService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IWord[]> {
    const searchParam: string | null = route.params['search'];
    const page: number = route.params['page'];
    const wordListId: number = route.params['wordListId'];

    return this.wordListService.getWordList(wordListId, page, searchParam);
  }
}
