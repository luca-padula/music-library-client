import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePlaylistCollapseComponent } from './create-playlist-collapse.component';

describe('CreatePlaylistCollapseComponent', () => {
  let component: CreatePlaylistCollapseComponent;
  let fixture: ComponentFixture<CreatePlaylistCollapseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePlaylistCollapseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePlaylistCollapseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
