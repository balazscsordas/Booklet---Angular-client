import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieService } from 'ngx-cookie-service';
import { of } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { WordQuizSettingsService } from 'src/app/services/word-quiz-settings/word-quiz-settings.service';
import { ChooseProfileComponent, Profile } from './choose-profile.component';
import { environment } from 'src/environments/environment';

describe('ChooseProfileComponent', () => {
  let component: ChooseProfileComponent;
  let fixture: ComponentFixture<ChooseProfileComponent>;
  let httpMock: HttpTestingController;
  let authService: AuthService;
  let errorHandlerService: ErrorHandlerService;
  let cookieService: CookieService;
  let quizSettingsService: WordQuizSettingsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ChooseProfileComponent],
      providers: [AuthService, ErrorHandlerService, CookieService, WordQuizSettingsService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseProfileComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
    errorHandlerService = TestBed.inject(ErrorHandlerService);
    cookieService = TestBed.inject(CookieService);
    quizSettingsService = TestBed.inject(WordQuizSettingsService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch profiles on component initialization', () => {
    const mockProfiles: Profile[] = [
      { id: 1, name: 'Profile 1' },
      { id: 2, name: 'Profile 2' },
    ];

    spyOn(component, 'getProfiles').and.callThrough();
    spyOn(component, 'router.navigateByUrl').and.stub();

    component.ngOnInit();

    const getProfilesRequest = httpMock.expectOne(`${environment.apiBaseURL}Profile/GetProfiles`);
    expect(getProfilesRequest.request.method).toBe('GET');

    getProfilesRequest.flush(mockProfiles);

    expect(component.getProfiles).toHaveBeenCalled();
    expect(component.profiles).toEqual(mockProfiles);
    expect(component.router.navigateByUrl).not.toHaveBeenCalled();
  });
});
