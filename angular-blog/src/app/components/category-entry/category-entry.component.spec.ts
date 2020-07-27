import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryEntryComponent } from './category-entry.component';

describe('CategoryEntryComponent', () => {
  let component: CategoryEntryComponent;
  let fixture: ComponentFixture<CategoryEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
