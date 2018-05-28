import {Injectable} from '@angular/core';
import {Candidate} from '../vo/candidate';


@Injectable()
export class QuizService {

  private questions = [
    {
      'id': 1,
      'question': 'capital of india',
      'correctAnswer': 3,
      'options': [{
        'id': 1,
        'option': 'mumbai'
      }, {
        'id': 2,
        'option': 'pune'
      }, {
        'id': 3,
        'option': 'delhi'
      }, {
        'id': 4,
        'option': 'bangalore'
      }]
    },
    {
      'id': 2,
      'question': 'capital of maharashtra',
      'correctAnswer': 1,
      'options': [{
        'id': 1,
        'option': 'mumbai'
      }, {
        'id': 2,
        'option': 'pune'
      }, {
        'id': 3,
        'option': 'satara'
      }, {
        'id': 4,
        'option': 'kolhapur'
      }]
    },
    {
      'id': 3,
      'question': 'capital of karnataka',
      'correctAnswer': 2,
      'options': [{
        'id': 1,
        'option': 'mumbai'
      }, {
        'id': 2,
        'option': 'bangalore'
      }, {
        'id': 3,
        'option': 'satara'
      }, {
        'id': 4,
        'option': 'kolhapur'
      }]
    },
    {
      'id': 4,
      'question': 'capital of kerala',
      'correctAnswer': 2,
      'options': [{
        'id': 1,
        'option': 'mumbai'
      }, {
        'id': 2,
        'option': 'trivandrum'
      }, {
        'id': 3,
        'option': 'satara'
      }, {
        'id': 4,
        'option': 'kolhapur'
      }]
    }
  ];

  private candidateAnswers = [];
  private candidateScores = [];

  private candidate: Candidate;

  constructor() {}

  init() {

    const _users = localStorage.getItem('user_data');
    if (null != _users) {
      console.log('Data present in local storage: ' + _users);
      this.candidateScores = JSON.parse(_users);
    } else {
      console.log('No data in local storage');
      this.candidateScores = [];
    }

  }

  reset() {
    this.candidate = undefined;
    this.candidateAnswers = [];
  }

  registerCandidate(candidate) {
    this.candidate = candidate;
    this.candidateAnswers = [];
  }

  getCandidate() {
    return this.candidate;
  }

  getQuestions() {
    console.log('Get questions.');
    const _questions = Object.assign([], this.questions);
    return _questions;
  }

  getQuestionsLength() {
    console.log('Get questions Length.');
    const _questions = Object.assign([], this.questions);
    return _questions.length;
  }

  getQuestion(index) {
    console.log('Get question index: ' + index);
    const _questions = Object.assign([], this.questions);
    if (index <= _questions.length) {
      return _questions[index - 1];
    } else {
      throw new Error('Question not found');
    }
  }

  submitCandidateScore(candidate) {
    const _candidate = Object.assign({}, candidate);
    this.candidateScores.push(_candidate);
    localStorage.setItem('user_data', JSON.stringify(this.candidateScores));
    console.log('Candidate Scores updated in local storage.');
  }

  getCandidateScores() {
    console.log('Get Candidate Scores.');
    const _candidateScores = Object.assign([], this.candidateScores);
    return _candidateScores;
  }

  storeUserAnswer(answerObj) {
    let questionFound = false;
    for (let i = 0; i < this.candidateAnswers.length; i++) {
      if (answerObj.questionId === this.candidateAnswers[i].questionId) {
        this.candidateAnswers[i].answerId = answerObj.answerId;
        questionFound = true;
        break;
      }
    }
    if (!questionFound) {
      this.candidateAnswers.push(answerObj);
    }
  }

  getUserAnswers() {
    return this.candidateAnswers;
  }

  calculateCandidateScore() {
    console.log(this.candidateAnswers);
    let score = 0;
    for (let i = 0; i < this.candidateAnswers.length; i++) {

      if (undefined !== this.candidateAnswers[i].answerId) {
        const correctAnswerId = this.getCorrectAnswerId(this.candidateAnswers[i].questionId);
        if (correctAnswerId === parseInt(this.candidateAnswers[i].answerId, 0)) {
          score++;
        }
      }
    }

    this.candidate.setScore(score);
    this.submitCandidateScore(this.candidate);
    return 1;
  }

  private getCorrectAnswerId(questionId) {
    for (let i = 0; i < this.questions.length; i++) {
      if (this.questions[i].id === parseInt(questionId, 0)) {
        return this.questions[i].correctAnswer;
      }
    }
  }


}
