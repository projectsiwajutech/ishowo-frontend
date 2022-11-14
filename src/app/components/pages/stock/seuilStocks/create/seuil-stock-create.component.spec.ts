import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeuilStockCreateComponent } from './seuil-stock-create.component';

describe('SeuilStockCreateComponent', () => {
  let component: SeuilStockCreateComponent;
  let fixture: ComponentFixture<SeuilStockCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeuilStockCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeuilStockCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
