import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessOpModalComponent } from './success-op-modal.component';

describe('SuccessOpModalComponent', () => {
  let component: SuccessOpModalComponent;
  let fixture: ComponentFixture<SuccessOpModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessOpModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessOpModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
