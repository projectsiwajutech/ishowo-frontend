import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaletargetDeleteComponent } from './saletarget-delete.component';

describe('SaletargetDeleteComponent', () => {
  let component: SaletargetDeleteComponent;
  let fixture: ComponentFixture<SaletargetDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaletargetDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaletargetDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
