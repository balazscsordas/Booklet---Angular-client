import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';

export interface IProfile {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class ChooseProfileService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private errorHandler: ErrorHandlerService,
  ) {}

  getProfiles() {
    return this.http.get<IProfile[]>(
      `${environment.apiBaseURL}Profile/GetProfiles`,
    );
  }

  /* getProfiles() {
    this.http
      .get<Profile[]>(`${environment.apiBaseURL}Profile/GetProfiles`)
      .pipe(catchError(error => this.errorHandler.handleError(error)))
      .subscribe(res => {
        if (res.length === 0) {
          this.router.navigateByUrl('/create-profile');
          return null;
        } else {
          return res;
        }
      });
  } */
}
