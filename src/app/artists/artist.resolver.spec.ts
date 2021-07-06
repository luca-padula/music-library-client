import { TestBed } from '@angular/core/testing';

import { ArtistResolver } from './artist.resolver';

describe('ArtistResolver', () => {
  let resolver: ArtistResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ArtistResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
