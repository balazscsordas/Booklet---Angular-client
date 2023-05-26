import { TestBed } from '@angular/core/testing';

import { WordQuizService } from './word-quiz.service';

describe('WordQuizService', () => {
  let service: WordQuizService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordQuizService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
