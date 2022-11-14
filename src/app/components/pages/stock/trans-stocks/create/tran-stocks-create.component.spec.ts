import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranStocksCreateComponent } from './tran-stocks-create.component';

describe('TranStocksCreateComponent', () => {
  let component: TranStocksCreateComponent;
  let fixture: ComponentFixture<TranStocksCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranStocksCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TranStocksCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
