import { TestBed } from '@angular/core/testing';

import { WordListResolver } from './word-list.resolver';

describe('WordListResolver', () => {
  let resolver: WordListResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(WordListResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
