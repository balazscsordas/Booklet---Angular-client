import { TestBed } from '@angular/core/testing';

import { WordQuizGuard } from './word-quiz.guard';

describe('WordQuizGuard', () => {
  let guard: WordQuizGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(WordQuizGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
