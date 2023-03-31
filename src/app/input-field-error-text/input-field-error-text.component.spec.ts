import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFieldErrorTextComponent } from './input-field-error-text.component';

describe('InputFieldErrorTextComponent', () => {
  let component: InputFieldErrorTextComponent;
  let fixture: ComponentFixture<InputFieldErrorTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputFieldErrorTextComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputFieldErrorTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
