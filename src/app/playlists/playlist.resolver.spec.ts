import { TestBed } from '@angular/core/testing';

import { PlaylistResolver } from './playlist.resolver';

describe('PlaylistResolver', () => {
  let resolver: PlaylistResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(PlaylistResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
