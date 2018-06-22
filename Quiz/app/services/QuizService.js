
angular.module('service.quizservice', [])

.service('QuizService', ['Config', 'AppLogger', function (Config, AppLogger) {

    AppLogger.log('Quiz Service Loaded');

    var questions = [
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

  var candidateAnswers = [];
  var candidateScores = [];
  var candidate = {};

  function init() {
    const _users = localStorage.getItem(Config.localStorageKey);
    if (null != _users) {
      candidateScores = JSON.parse(_users);
    } else {
      candidateScores = [];
    }
    AppLogger.log('Quiz Service Initialized');
  };

  this.reset = function() {
    AppLogger.log("Service User Reset");
    candidate = undefined;
    candidateAnswers = [];
  };

  this.registerUser = function(_candidate, promise){
    candidate = _candidate;
    candidateAnswers = [];
    promise({'status':200});
  };

  this.getCandidate = function() {
    return candidate;
  };

  this.getQuestion = function(index) {  
    console.log(candidate);  
    const _questions = jQuery.extend(true, [], questions);
    if (index <= _questions.length && index > 0) {
      return _questions[index - 1];
    } else {
      throw new Error('Question not found');
    }
  };

  this.getQuestions = function(){
    const _questions = jQuery.extend(true, [], questions);
    return _questions;
  }

  this.getQuestionsLength = function() {
    const _questions = jQuery.extend(true, [], questions);
    return _questions.length;
  };

  this.storeUserAnswer = function(answerObj) {
    let questionFound = false;
    for (let i = 0; i < candidateAnswers.length; i++) {
      if (answerObj.questionId === candidateAnswers[i].questionId) {
        candidateAnswers[i].answerId = answerObj.answerId;
        questionFound = true;
        break;
      }
    }
    if (!questionFound) {
      candidateAnswers.push(answerObj);
      console.log(candidateAnswers);
    }
  };

  this.calculateCandidateScore = function() {
    let score = 0;
    for (let i = 0; i < candidateAnswers.length; i++) {

      if (undefined !== candidateAnswers[i].answerId) {
        const correctAnswerId = getCorrectAnswerId(candidateAnswers[i].questionId);
        if (correctAnswerId === parseInt(candidateAnswers[i].answerId, 0)) {
          score++;
        }
      }
    }
    console.log(score);
    console.log(candidate);
    candidate.score = score;
    submitCandidateScore(candidate);
    return 1;
  }

  function getCorrectAnswerId(questionId) {
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].id === parseInt(questionId, 0)) {
        return questions[i].correctAnswer;
      }
    }
  };

  function submitCandidateScore (candidate) {
    const _candidate = jQuery.extend(true, {}, candidate);
    candidateScores.push(_candidate);
    localStorage.setItem(Config.localStorageKey, JSON.stringify(candidateScores));
 };

  this.getCandidateScores = function() {
    const _candidateScores = jQuery.extend(true, [], candidateScores);
    return _candidateScores;
  };

  init();

}]);
