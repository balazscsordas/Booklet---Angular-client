import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { WordDetailsService } from '../service/word-details.service';

@Injectable({
  providedIn: 'root',
})
export class WordDetailsResolver implements Resolve<any> {
  constructor(private wordDetails: WordDetailsService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const id: number = route.params['id'];
    return this.wordDetails.getWord(id);
  }
}
