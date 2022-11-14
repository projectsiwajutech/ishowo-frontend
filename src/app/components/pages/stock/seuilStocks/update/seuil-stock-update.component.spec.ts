import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeuilStockUpdateComponent } from './seuil-stock-update.component';

describe('SeuilStockUpdateComponent', () => {
  let component: SeuilStockUpdateComponent;
  let fixture: ComponentFixture<SeuilStockUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeuilStockUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeuilStockUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
