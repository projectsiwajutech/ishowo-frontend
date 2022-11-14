import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeCreateComponent } from './commande-create.component';

describe('CommandeCreateComponent', () => {
  let component: CommandeCreateComponent;
  let fixture: ComponentFixture<CommandeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandeCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
