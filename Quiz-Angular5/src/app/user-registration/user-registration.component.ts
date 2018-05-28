import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {QuizService} from '../services/quiz.service';
import {Candidate} from '../vo/candidate';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {
  registrationFormTitle: string;
  registrationFormDescription: string;
  candidate: Candidate;

  constructor(private router: Router, private service: QuizService) {
    this.registrationFormTitle = 'Quiz Registration';
    this.registrationFormDescription = 'Start Quiz by filling below form';

  }

  ngOnInit() {
    this.candidate = new Candidate();
    this.service.reset();
  }

  registerCandidate(event) {
    console.log('Register Candidate: ' + JSON.stringify(this.candidate));
    this.service.registerCandidate(this.candidate);
    this.router.navigate(['questions'], {queryParams: {question: '1'}});
    console.log('User Registered');
  }

}
