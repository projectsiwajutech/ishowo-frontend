import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranStocksDetailsComponent } from './tran-stocks-details.component';

describe('TranStocksDetailsComponent', () => {
  let component: TranStocksDetailsComponent;
  let fixture: ComponentFixture<TranStocksDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranStocksDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TranStocksDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
