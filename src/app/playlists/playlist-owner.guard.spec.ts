import { TestBed } from '@angular/core/testing';

import { PlaylistOwnerGuard } from './playlist-owner.guard';

describe('PlaylistOwnerGuard', () => {
  let guard: PlaylistOwnerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PlaylistOwnerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
