import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeuilStockListComponent } from './seuil-stock-list.component';

describe('SeuilStockListComponent', () => {
  let component: SeuilStockListComponent;
  let fixture: ComponentFixture<SeuilStockListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeuilStockListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeuilStockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
