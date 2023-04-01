import { TestBed } from '@angular/core/testing';

import { WordQuizSettingsService } from './word-quiz-settings.service';

describe('WordQuizSettingsService', () => {
  let service: WordQuizSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordQuizSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
