import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgottenPasswordInputComponent } from './forgotten-password-input.component';

describe('ForgottenPasswordInputComponent', () => {
  let component: ForgottenPasswordInputComponent;
  let fixture: ComponentFixture<ForgottenPasswordInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgottenPasswordInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgottenPasswordInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
