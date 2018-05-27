import { Component, OnInit } from '@angular/core';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-quiz-results',
  templateUrl: './quiz-results.component.html',
  styleUrls: ['./quiz-results.component.css']
})
export class QuizResultsComponent implements OnInit {

  private candidateScores;
 
  constructor(private service: QuizService) { }

  ngOnInit() {
       this.service.init();
       this.candidateScores = this.service.getCandidateScores();
       this.candidateScores.sort(this.sortScores);
      console.log(this.candidateScores);
  }

 sortScores (a, b) {
        var aScore = a.score;
        var bScore = b.score;
        return ((aScore < bScore) ? 1 : ((aScore > bScore) ? -1 : 0));
 } 
}
