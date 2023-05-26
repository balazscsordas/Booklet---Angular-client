import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordQuizSettingsComponent } from './word-quiz-settings.component';

describe('WordQuizSettingsComponent', () => {
  let component: WordQuizSettingsComponent;
  let fixture: ComponentFixture<WordQuizSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordQuizSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordQuizSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
