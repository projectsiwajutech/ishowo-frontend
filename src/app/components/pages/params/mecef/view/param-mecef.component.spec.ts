import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamMecefComponent } from './param-mecef.component';

describe('ParamMecefComponent', () => {
  let component: ParamMecefComponent;
  let fixture: ComponentFixture<ParamMecefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParamMecefComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParamMecefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
