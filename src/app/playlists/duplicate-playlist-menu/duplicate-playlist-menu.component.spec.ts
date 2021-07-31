import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicatePlaylistMenuComponent } from './duplicate-playlist-menu.component';

describe('DuplicatePlaylistMenuComponent', () => {
  let component: DuplicatePlaylistMenuComponent;
  let fixture: ComponentFixture<DuplicatePlaylistMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DuplicatePlaylistMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DuplicatePlaylistMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
