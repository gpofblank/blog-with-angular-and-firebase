import { TestBed } from '@angular/core/testing';

import { NotAllowedForLoggedUsersGuard } from './not-allowed-for-logged-users.guard';

describe('NotAllowedForLoggedUsersGuard', () => {
  let guard: NotAllowedForLoggedUsersGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NotAllowedForLoggedUsersGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
