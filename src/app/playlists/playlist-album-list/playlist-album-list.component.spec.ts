import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistAlbumListComponent } from './playlist-album-list.component';

describe('PlaylistAlbumListComponent', () => {
  let component: PlaylistAlbumListComponent;
  let fixture: ComponentFixture<PlaylistAlbumListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaylistAlbumListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistAlbumListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
