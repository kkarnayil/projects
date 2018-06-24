
angular.module('service.quizservice', [])

.service('QuizService', ['Config', 'AppLogger','SessionService', function (Config, AppLogger, SessionService) {

    AppLogger.log('Quiz Service Loaded');
    var self = this;
    var candidateScores = [];
    var candidate = {};
    var questions = [
        {
            "id": 1,
            "question": "capital of assam",
            "correctAnswer": 3,
            "options": [{
                "id": 1,
                "option": "silchar"
            }, {
                "id": 2,
                "option": "shillong"
            }, {
                "id": 3,
                "option": "dispur"
            }, {
                "id": 4,
                "option": "guwahati"
            }]
        },
        {
            "id": 2,
            "question": "capital of meghalaya",
            "correctAnswer": 1,
            "options": [{
                "id": 1,
                "option": "shillong"
            }, {
                "id": 2,
                "option": "itanagar"
            }, {
                "id": 3,
                "option": "imphal"
            }, {
                "id": 4,
                "option": "agartala"
            }]
        },
        {
            "id": 3,
            "question": "capital of manipur",
            "correctAnswer": 2,
            "options": [{
                "id": 1,
                "option": "itanagar"
            }, {
                "id": 2,
                "option": "imphal"
            }, {
                "id": 3,
                "option": "shillong"
            }, {
                "id": 4,
                "option": "agartala"
            }]
        },
        {
            "id": 4,
            "question": "capital of arunachal pradesh",
            "correctAnswer": 3,
            "options": [{
                "id": 1,
                "option": "imphal"
            }, {
                "id": 2,
                "option": "agartala"
            }, {
                "id": 3,
                "option": "itanagar"
            }, {
                "id": 4,
                "option": "shillong"
            }]
        }
    ];

  
  this.onInit = function() {
    const _users = SessionService.getAllCandidateScores();
    if (null != _users) {
      candidateScores = JSON.parse(_users);
    } else {
      candidateScores = [];
    }
    candidate = SessionService.getUser();
    AppLogger.log('Quiz Service Initialized');
  };

  this.getQuestion = function(index) {  
   if(SessionService.canAccessQuiz()){
     const _questions = jQuery.extend(true, [], questions);
      if (index <= _questions.length && index > 0) {
        return _questions[index - 1];
      } else {
        throw new Error('Question not found');
      }
    }else{
      throw new Error('No Access to Questions');
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
    for (let i = 0; i < candidate.candidateAnswers.length; i++) {
      if (answerObj.questionId === candidate.candidateAnswers[i].questionId) {
        candidate.candidateAnswers[i].answerId = answerObj.answerId;
        questionFound = true;
        break;
      }
    }
    if (!questionFound) {
      candidate.candidateAnswers.push(answerObj);
    }
    localStorage.setItem(Config.userSessionKey, JSON.stringify(candidate));
  };

  this.calculateCandidateScore = function() {
    let score = 0;
    for (let i = 0; i < candidate.candidateAnswers.length; i++) {
      if (undefined !== candidate.candidateAnswers[i].answerId) {
        const correctAnswerId = getCorrectAnswerId(candidate.candidateAnswers[i].questionId);
        if (correctAnswerId === parseInt(candidate.candidateAnswers[i].answerId, 0)) {
          score++;
        }
      }
    }
    candidate.score = score;
    submitCandidateScore(candidate);
    return 1;
  }

  this.getCandidateAnswer = function(questionId){
    if(null != candidate){
      for (let i = 0; i < candidate.candidateAnswers.length; i++) {
          if(questionId == candidate.candidateAnswers[i].questionId){
              if(candidate.candidateAnswers[i].answerId){
                return candidate.candidateAnswers[i].answerId;
              }
          }
      }
    }

    return null;
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
    let isCandidatePresent = false;
    localStorage.setItem(Config.userSessionKey, JSON.stringify(_candidate));
    for(let i = 0 ; i < candidateScores.length ; i++){
      if(candidateScores[i].email == candidate.email){
        candidateScores[i].score = _candidate.score;
        isCandidatePresent = true;
        break;
      }
    }
    if(!isCandidatePresent){
      candidateScores.push(_candidate);
    }
    
    localStorage.setItem(Config.localStorageKey, JSON.stringify(candidateScores));
 };

  this.getCandidateScores = function() {
    const _candidateScores = jQuery.extend(true, [], candidateScores);
    return _candidateScores;
  };

  this.onInit();

}]);
