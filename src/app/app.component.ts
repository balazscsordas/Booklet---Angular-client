import { Component } from '@angular/core';
import { ProgressbarService } from './services/progressbar/progressbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'client';
  isLoading$ = this.progressbarService.getIsLoading();

  constructor(public progressbarService: ProgressbarService) {}
}
