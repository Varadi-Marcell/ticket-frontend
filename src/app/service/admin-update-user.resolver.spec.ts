import { TestBed } from '@angular/core/testing';

import { AdminUpdateUserResolver } from './admin-update-user.resolver';

describe('AdminUpdateUserResolver', () => {
  let resolver: AdminUpdateUserResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AdminUpdateUserResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
