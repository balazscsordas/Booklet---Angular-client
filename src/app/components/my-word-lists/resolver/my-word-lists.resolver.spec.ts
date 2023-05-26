import { TestBed } from '@angular/core/testing';

import { MyWordListsResolver } from './my-word-lists.resolver';

describe('MyWordListsResolver', () => {
  let resolver: MyWordListsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(MyWordListsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
