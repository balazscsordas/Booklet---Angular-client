import { TestBed } from '@angular/core/testing';

import { WordDetailsService } from './word-details.service';

describe('WordDetailsService', () => {
  let service: WordDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
