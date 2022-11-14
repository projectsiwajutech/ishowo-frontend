import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductStockUpdateComponent } from './product-stock-update.component';

describe('ProductStockUpdateComponent', () => {
  let component: ProductStockUpdateComponent;
  let fixture: ComponentFixture<ProductStockUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductStockUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductStockUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
