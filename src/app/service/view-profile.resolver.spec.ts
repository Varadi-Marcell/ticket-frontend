import { TestBed } from '@angular/core/testing';

import { ViewProfileResolver } from './view-profile.resolver';

describe('ViewProfileResolver', () => {
  let resolver: ViewProfileResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ViewProfileResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
