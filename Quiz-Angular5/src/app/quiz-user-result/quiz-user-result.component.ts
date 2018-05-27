import { Component, OnInit } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { Candidate } from '../vo/candidate'


@Component({
  selector: 'app-quiz-user-result',
  templateUrl: './quiz-user-result.component.html',
  styleUrls: ['./quiz-user-result.component.css']
})
export class QuizUserResultComponent implements OnInit {

  private candidate: Candidate;
  private questions;
    
  constructor(private service: QuizService) { }

  ngOnInit() {
      this.candidate = this.service.getCandidate();
      this.questions = this.service.getQuestions();
  }

}
