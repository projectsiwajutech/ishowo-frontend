import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSoldStatsComponent } from './product-sold-stats.component';

describe('ProductSoldStatsComponent', () => {
  let component: ProductSoldStatsComponent;
  let fixture: ComponentFixture<ProductSoldStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductSoldStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSoldStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
