import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizFooterComponent } from './quiz-footer.component';

describe('QuizFooterComponent', () => {
  let component: QuizFooterComponent;
  let fixture: ComponentFixture<QuizFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
