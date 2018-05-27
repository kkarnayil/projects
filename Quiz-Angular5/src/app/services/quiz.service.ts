import { Injectable } from '@angular/core';
import { Candidate } from '../vo/candidate'


@Injectable()
export class QuizService {

  private candidateScores = [];

  private candidate: Candidate;

  constructor() { }
  
  init() {
    
    var _users = localStorage.getItem('user_data');
        if (null != _users) {
            console.log("Data present in local storage: " + _users);
            this.candidateScores = JSON.parse(_users);
        } else {
            console.log("No data in local storage");
            this.candidateScores = [];
        }
      
  };


    
  registerCandidate(candidate){
      this.candidate = candidate;
  };
  
  getCandidate(){
      return this.candidate;
  }
    
  getQuestions(){
      console.log("Get questions.");
      let _questions = Object.assign([], this.questions);
      return _questions;
  };
     
  submitCandidateScore(candidate) {
        var _candidate = Object.assign({}, candidate);
        this.candidateScores.push(_candidate);
        localStorage.setItem('user_data', JSON.stringify(this.candidateScores));
        console.log("Candidate Scores updated in local storage.")
  };
    
  getCandidateScores(){
      console.log("Get Candidate Scores.");
      let _candidateScores = Object.assign([], this.candidateScores);
      return _candidateScores;
  };
       
  private questions = [
        {
            "id": 1,
            "question": "capital of india",
            "correctAnswer": 3,
            "options": [{
                "id": 1,
                "option": "mumbai"
            }, {
                "id": 2,
                "option": "pune"
            }, {
                "id": 3,
                "option": "delhi"
            }, {
                "id": 4,
                "option": "bangalore"
            }]
        },
        {
            "id": 2,
            "question": "capital of maharashtra",
            "correctAnswer": 1,
            "options": [{
                "id": 1,
                "option": "mumbai"
            }, {
                "id": 2,
                "option": "pune"
            }, {
                "id": 3,
                "option": "satara"
            }, {
                "id": 4,
                "option": "kolhapur"
            }]
        },
        {
            "id": 3,
            "question": "capital of karnataka",
            "correctAnswer": 2,
            "options": [{
                "id": 1,
                "option": "mumbai"
            }, {
                "id": 2,
                "option": "bangalore"
            }, {
                "id": 3,
                "option": "satara"
            }, {
                "id": 4,
                "option": "kolhapur"
            }]
        },
        {
            "id": 4,
            "question": "capital of kerala",
            "correctAnswer": 2,
            "options": [{
                "id": 1,
                "option": "mumbai"
            }, {
                "id": 2,
                "option": "trivandrum"
            }, {
                "id": 3,
                "option": "satara"
            }, {
                "id": 4,
                "option": "kolhapur"
            }]
        }
                  ];


}
