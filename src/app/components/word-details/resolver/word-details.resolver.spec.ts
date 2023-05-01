import { TestBed } from '@angular/core/testing';

import { WordDetailsResolver } from './word-details.resolver';

describe('WordDetailsResolver', () => {
  let resolver: WordDetailsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(WordDetailsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
