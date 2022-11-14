import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductGlobalStatsComponent } from './product-global-stats.component';

describe('ProductGlobalStatsComponent', () => {
  let component: ProductGlobalStatsComponent;
  let fixture: ComponentFixture<ProductGlobalStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductGlobalStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductGlobalStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
