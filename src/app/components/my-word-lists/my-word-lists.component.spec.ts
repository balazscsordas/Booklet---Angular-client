import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyWordListsComponent } from './my-word-lists.component';

describe('MyWordListsComponent', () => {
  let component: MyWordListsComponent;
  let fixture: ComponentFixture<MyWordListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyWordListsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyWordListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
