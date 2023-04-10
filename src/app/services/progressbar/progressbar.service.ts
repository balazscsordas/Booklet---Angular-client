import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProgressbarService {
  private isLoading = false;

  getIsLoading() {
    return this.isLoading;
  }

  show() {
    this.isLoading = true;
  }

  hide() {
    this.isLoading = false;
  }
}
