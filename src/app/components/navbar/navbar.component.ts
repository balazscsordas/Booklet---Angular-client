import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  constructor(private auth: AuthService) {}

  authenticated = false;

  ngOnInit() {
    if (this.auth.accessToken) {
      this.authenticated = true;
    }
  }

  logout() {
    this.auth.signOut();
  }
}
