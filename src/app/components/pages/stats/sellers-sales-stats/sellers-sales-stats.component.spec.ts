import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellersSalesStatsComponent } from './sellers-sales-stats.component';

describe('SellersSalesStatsComponent', () => {
  let component: SellersSalesStatsComponent;
  let fixture: ComponentFixture<SellersSalesStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellersSalesStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellersSalesStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
