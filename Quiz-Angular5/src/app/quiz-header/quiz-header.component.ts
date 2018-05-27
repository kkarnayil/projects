import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-quiz-header',
  templateUrl: './quiz-header.component.html',
  styleUrls: ['./quiz-header.component.css']
})
export class QuizHeaderComponent implements OnInit {
  isHome = 'active';
  isUserScores = '';
  constructor(private router: Router) {}

  ngOnInit() {
    const currentPath = window.location.pathname;

    switch (currentPath) {
      case ('/user-results'):
        this.isHome = '';
        this.isUserScores = 'active';
        break;
      default:
        this.isHome = 'active';
        this.isUserScores = '';
    }
  }

}
