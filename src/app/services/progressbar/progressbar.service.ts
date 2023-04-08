import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProgressbarService {
  private isLoading = false;

  getIsLoading() {
    return this.isLoading;
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }
}
