import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, NavigationEnd} from '@angular/router';
import {QuizService} from '../services/quiz.service';
import {RouteService} from '../services/route.service';
import {Candidate} from '../vo/candidate';


@Component({
  selector: 'app-quiz-question',
  templateUrl: './quiz-question.component.html',
  styleUrls: ['./quiz-question.component.css']
})
export class QuizQuestionComponent implements OnInit {

  question;

  candidate: Candidate;

  questionIndex: string;

  constructor(private route: ActivatedRoute, private router: Router, private service: QuizService, private routeService: RouteService) {
    console.log('in constructor');
    this.route.queryParams.subscribe(params => {

      const previousUrl = this.routeService.getPreviousUrl();
      console.log(previousUrl);
      if (previousUrl === '/user-result') {
        this.router.navigate(['user-result']);
      }

      this.questionIndex = params['question'];
      if (this.questionIndex) {
        this.question = this.service.getQuestion(this.questionIndex);
      } else {
        console.error('Query Param Value' + this.questionIndex);
        this.router.navigate(['']);
      }
    });
  }


  ngOnInit() {
    console.log('in init');
    this.candidate = this.service.getCandidate();
    if (undefined === this.candidate) {
      console.error('Candidate not registered.');
      this.router.navigate(['']);
    }
  }

  next() {
    const answerObj = {questionId: null, answerId: null};
    answerObj.questionId = this.question.id;
    answerObj.answerId = this.question.selectedAnswer;
    this.service.storeUserAnswer(answerObj);

    const currentIndex = parseInt(this.questionIndex, 0);
    if (currentIndex < this.service.getQuestionsLength()) {
      this.router.navigate(['questions'], {queryParams: {question: currentIndex + 1}});
    } else {
      const response = this.service.calculateCandidateScore();
      if (1 === response) {
        this.router.navigate(['user-result']);
      }
    }
  }


}
