import { TestBed } from '@angular/core/testing';

import { ChooseProfileResolver } from './choose-profile.resolver';

describe('ChooseProfileResolver', () => {
  let resolver: ChooseProfileResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ChooseProfileResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
