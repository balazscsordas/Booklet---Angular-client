import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}

  authenticated = false;

  ngOnInit() {
    if (this.auth.userToken) {
      this.authenticated = true;
    }
  }

  logout() {
    this.auth.signOut();
  }

  goToProfilePage() {
    this.router.navigateByUrl('choose-profile');
  }
}
