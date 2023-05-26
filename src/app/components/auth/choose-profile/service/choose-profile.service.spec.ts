import { TestBed } from '@angular/core/testing';

import { ChooseProfileService } from './choose-profile.service';

describe('ChooseProfileService', () => {
  let service: ChooseProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChooseProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
