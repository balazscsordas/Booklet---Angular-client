import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { catchError } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { environment } from 'src/environments/environment';

interface Profile {
  id: number;
  name: string;
}

@Component({
  selector: 'app-choose-profile',
  templateUrl: './choose-profile.component.html',
})
export class ChooseProfileComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router,
    private errorHandler: ErrorHandlerService,
    private cookieService: CookieService,
  ) {}
  profiles?: Profile[];

  ngOnInit(): void {
    this.getProfiles();
  }

  private getProfiles() {
    this.http
      .get<Profile[]>(`${environment.apiBaseURL}Profile/GetProfiles`)
      .pipe(catchError(error => this.errorHandler.handleError(error)))
      .subscribe(res => {
        if (res.length === 0) {
          this.router.navigateByUrl('/create-profile');
        } else {
          this.profiles = res;
        }
      });
  }

  setProfile(profile_id: number) {
    this.http
      .post<{ profileToken: string }>(
        `${environment.apiBaseURL}Profile/SetProfile`,
        { profile_id },
      )
      .pipe(catchError(error => this.errorHandler.handleError(error)))
      .subscribe(res => {
        this.cookieService.set(
          'Profile',
          res.profileToken,
          1,
          undefined,
          undefined,
          true,
        );
        this.auth.profileToken = res.profileToken;
        this.router.navigateByUrl('');
      });
  }
}
