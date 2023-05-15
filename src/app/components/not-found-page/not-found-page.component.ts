import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
})
export class NotFoundPageComponent {
  constructor(private location: Location) {}

  goBackToPreviousPage() {
    this.location.back();
  }
}
