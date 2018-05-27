import {Component, OnInit, Input} from '@angular/core';
import {Router} from '@angular/router';
import {QuizService} from '../services/quiz.service';
import {Candidate} from '../vo/candidate';

@Component({
  selector: 'app-quiz-questions',
  templateUrl: './quiz-questions.component.html',
  styleUrls: ['./quiz-questions.component.css']
})
export class QuizQuestionsComponent implements OnInit {

  questions;

  candidate: Candidate;

  constructor(private router: Router, private service: QuizService) {}

  ngOnInit() {
    this.questions = this.service.getQuestions();
    this.candidate = this.service.getCandidate();
  }

  calculateScore() {
    console.log('Calculate Score called...');
    let score = 0;
    for (let i = 0; i < this.questions.length; i++) {

      if (undefined !== this.questions[i].selectedAnswer) {

        if (this.questions[i].correctAnswer === parseInt(this.questions[i].selectedAnswer, 0)) {
          score++;
        }
      }
    }

    this.candidate.setScore(score);
    this.service.submitCandidateScore(this.candidate);
    this.router.navigate(['user-result']);

  }


}
