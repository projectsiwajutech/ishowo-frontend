import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductOnRetailComponent } from '../put-on-retail/product-on-retail.component';

describe('ProductOnRetailComponent', () => {
  let component: ProductOnRetailComponent;
  let fixture: ComponentFixture<ProductOnRetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductOnRetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductOnRetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
