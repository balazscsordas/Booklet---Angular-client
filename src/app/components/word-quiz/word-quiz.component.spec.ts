import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordQuizComponent } from './word-quiz.component';

describe('WordQuizComponent', () => {
  let component: WordQuizComponent;
  let fixture: ComponentFixture<WordQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordQuizComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
