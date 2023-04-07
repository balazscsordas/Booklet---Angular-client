import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialSettingsComponent } from './initial-settings.component';

describe('InitialSettingsComponent', () => {
  let component: InitialSettingsComponent;
  let fixture: ComponentFixture<InitialSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitialSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitialSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
