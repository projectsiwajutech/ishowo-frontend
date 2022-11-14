import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedOrdersListComponent } from './saved-orders-list.component';

describe('SavedOrdersListComponent', () => {
  let component: SavedOrdersListComponent;
  let fixture: ComponentFixture<SavedOrdersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedOrdersListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedOrdersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
