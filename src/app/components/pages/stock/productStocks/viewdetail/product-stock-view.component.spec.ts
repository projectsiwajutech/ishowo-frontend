import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductStockViewComponent } from './product-stock-view.component';

describe('ProductStockViewComponent', () => {
  let component: ProductStockViewComponent;
  let fixture: ComponentFixture<ProductStockViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductStockViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductStockViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
