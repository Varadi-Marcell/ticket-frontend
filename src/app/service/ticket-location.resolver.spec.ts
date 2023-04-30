import { TestBed } from '@angular/core/testing';

import { TicketLocationResolver } from './ticket-location.resolver';

describe('TicketLocationResolver', () => {
  let resolver: TicketLocationResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(TicketLocationResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
