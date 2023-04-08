import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseProfileComponent } from './choose-profile.component';

describe('ChooseProfileComponent', () => {
  let component: ChooseProfileComponent;
  let fixture: ComponentFixture<ChooseProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
