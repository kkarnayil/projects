import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizUserResultsComponent } from './quiz-user-results.component';

describe('QuizUserResultsComponent', () => {
  let component: QuizUserResultsComponent;
  let fixture: ComponentFixture<QuizUserResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizUserResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizUserResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
