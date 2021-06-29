import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAlbumToPlaylistMenuComponent } from './add-album-to-playlist-menu.component';

describe('AddAlbumToPlaylistMenuComponent', () => {
  let component: AddAlbumToPlaylistMenuComponent;
  let fixture: ComponentFixture<AddAlbumToPlaylistMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAlbumToPlaylistMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAlbumToPlaylistMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
