import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { catchError } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { WordQuizSettingsService } from 'src/app/services/word-quiz-settings/word-quiz-settings.service';
import { environment } from 'src/environments/environment';
import { IProfile } from './service/choose-profile.service';

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
    private activatedRoute: ActivatedRoute,
    private quizSettings: WordQuizSettingsService,
  ) {}
  profiles?: IProfile[];

  ngOnInit(): void {
    this.profiles = this.activatedRoute.snapshot.data['profiles'];
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
        this.quizSettings.getLanguageOptions();
      });
  }
}
