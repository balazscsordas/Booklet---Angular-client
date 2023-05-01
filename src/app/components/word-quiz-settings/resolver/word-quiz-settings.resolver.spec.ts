import { TestBed } from '@angular/core/testing';

import { WordQuizSettingsResolver } from './word-quiz-settings.resolver';

describe('WordQuizSettingsResolver', () => {
  let resolver: WordQuizSettingsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(WordQuizSettingsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
