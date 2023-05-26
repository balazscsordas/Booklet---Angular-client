import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWordListDialogComponent } from './create-word-list-dialog.component';

describe('CreateWordListDialogComponent', () => {
  let component: CreateWordListDialogComponent;
  let fixture: ComponentFixture<CreateWordListDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateWordListDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateWordListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
