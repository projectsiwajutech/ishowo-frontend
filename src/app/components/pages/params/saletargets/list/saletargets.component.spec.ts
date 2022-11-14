import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaletargetsComponent } from './saletargets.component';

describe('SaletargetsComponent', () => {
  let component: SaletargetsComponent;
  let fixture: ComponentFixture<SaletargetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaletargetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaletargetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
