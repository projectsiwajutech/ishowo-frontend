import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccountDeleteComponent } from './vaccount-delete.component';

describe('VaccountDeleteComponent', () => {
  let component: VaccountDeleteComponent;
  let fixture: ComponentFixture<VaccountDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccountDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccountDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
