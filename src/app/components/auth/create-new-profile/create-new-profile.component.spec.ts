import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewProfileComponent } from './create-new-profile.component';

describe('CreateNewProfileComponent', () => {
  let component: CreateNewProfileComponent;
  let fixture: ComponentFixture<CreateNewProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
