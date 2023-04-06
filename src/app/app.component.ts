import { Component } from '@angular/core';
import { ProgressbarService } from './services/progressbar/progressbar.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'client';
  isLoading$ = this.progressbarService.getIsLoading();

  constructor(
    private router: Router,
    private progressbarService: ProgressbarService,
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.progressbarService.setIsLoading(true);
      } else if (event instanceof NavigationEnd) {
        this.progressbarService.setIsLoading(false);
      }
    });
  }
}
