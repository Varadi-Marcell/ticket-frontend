import { TestBed } from '@angular/core/testing';

import { ViewCartResolver } from './view-cart.resolver';

describe('ViewCartResolver', () => {
  let resolver: ViewCartResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ViewCartResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
