import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranStocksListComponent } from './tran-stocks-list.component';

describe('TranStocksListComponent', () => {
  let component: TranStocksListComponent;
  let fixture: ComponentFixture<TranStocksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranStocksListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TranStocksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
