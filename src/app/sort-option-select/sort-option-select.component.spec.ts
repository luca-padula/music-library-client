import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortOptionSelectComponent } from './sort-option-select.component';

describe('SortOptionSelectComponent', () => {
  let component: SortOptionSelectComponent;
  let fixture: ComponentFixture<SortOptionSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortOptionSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortOptionSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
