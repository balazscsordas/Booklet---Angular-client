import { TestBed } from '@angular/core/testing';

import { MyWordListsService } from './my-word-lists.service';

describe('MyWordListsService', () => {
  let service: MyWordListsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyWordListsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
