import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWordDialogComponent } from './add-word-dialog.component';

describe('AddWordDialogComponent', () => {
  let component: AddWordDialogComponent;
  let fixture: ComponentFixture<AddWordDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWordDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddWordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
