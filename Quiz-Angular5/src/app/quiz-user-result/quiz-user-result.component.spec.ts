import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizUserResultComponent } from './quiz-user-result.component';

describe('QuizUserResultComponent', () => {
  let component: QuizUserResultComponent;
  let fixture: ComponentFixture<QuizUserResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizUserResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizUserResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
