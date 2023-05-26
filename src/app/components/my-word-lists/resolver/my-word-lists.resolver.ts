import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { MyWordListsService } from '../service/my-word-lists.service';
import { IWordList } from '../my-word-lists.component';

@Injectable({
  providedIn: 'root',
})
export class MyWordListsResolver implements Resolve<IWordList[]> {
  constructor(private myWordListsService: MyWordListsService) {}

  resolve(): Observable<IWordList[]> {
    return this.myWordListsService.getWordLists();
  }
}
