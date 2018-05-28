import {Component, OnInit} from '@angular/core';
import {QuizService} from '../services/quiz.service';

@Component({
  selector: 'app-quiz-results',
  templateUrl: './quiz-results.component.html',
  styleUrls: ['./quiz-results.component.css']
})
export class QuizResultsComponent implements OnInit {

  tableHeader = 'Leaders';
  candidateScores = [];

  constructor(private service: QuizService) {}

  ngOnInit() {
    this.service.init();
    this.candidateScores = this.service.getCandidateScores();
    this.candidateScores.sort(this.sortScores);
    this.candidateScores = this.filterScores(this.candidateScores);
    console.log(this.candidateScores);
  }

  filterScores(scores: any): any {
    const currentPath = window.location.pathname;
    let filterLength = scores.lenth;
    this.tableHeader = 'User Scores';
    switch (currentPath) {
      case ('/user-results'):
        filterLength = scores.length;
        break;
      default:
        filterLength = scores.length >= 5 ? 5 : scores.length;
        this.tableHeader = 'Leaders';
    }
    return scores.splice(0 , filterLength);
  }

  sortScores(a, b) {
    const aScore = a.score;
    const bScore = b.score;
    return ((aScore < bScore) ? 1 : ((aScore > bScore) ? -1 : 0));
  }
}
