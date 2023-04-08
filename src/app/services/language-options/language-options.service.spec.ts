import { TestBed } from '@angular/core/testing';

import { LanguageOptionsService } from './language-options.service';

describe('LanguageOptionsService', () => {
  let service: LanguageOptionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguageOptionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
