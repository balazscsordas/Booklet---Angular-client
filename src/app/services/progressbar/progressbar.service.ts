import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProgressbarService {
  private isLoading = new BehaviorSubject<boolean>(false);

  getIsLoading() {
    return this.isLoading.asObservable();
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading.next(isLoading);
  }
}
