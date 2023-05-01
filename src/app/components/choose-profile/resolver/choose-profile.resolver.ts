import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import {
  ChooseProfileService,
  IProfile,
} from '../service/choose-profile.service';

@Injectable({
  providedIn: 'root',
})
export class ChooseProfileResolver implements Resolve<IProfile[]> {
  constructor(private chooseProfile: ChooseProfileService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<IProfile[]> {
    return this.chooseProfile.getProfiles();
  }
}
