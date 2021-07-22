import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePlaylistMenuComponent } from './delete-playlist-menu.component';

describe('DeletePlaylistMenuComponent', () => {
  let component: DeletePlaylistMenuComponent;
  let fixture: ComponentFixture<DeletePlaylistMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePlaylistMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePlaylistMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
