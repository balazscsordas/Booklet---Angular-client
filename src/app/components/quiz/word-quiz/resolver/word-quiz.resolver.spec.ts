import { TestBed } from '@angular/core/testing';

import { WordQuizResolver } from './word-quiz.resolver';

describe('WordQuizResolver', () => {
  let resolver: WordQuizResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(WordQuizResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
