import { TestBed } from '@angular/core/testing';

import { TicketGenreResolver } from './ticket-genre.resolver';

describe('TicketGenreResolver', () => {
  let resolver: TicketGenreResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(TicketGenreResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
