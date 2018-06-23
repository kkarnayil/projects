'use strict';

angular.module('view.question', [])
.config(['$routeProvider', function( $routeProvider) {
  $routeProvider.when('/question', {
    templateUrl: 'views/question/question.html',
    controller: 'QuestionController',
    authenticationRequired : true
  })
}])

.controller('QuestionController', ['$scope', '$location', 'AppLogger', 'QuizService', 'SessionService', function($scope, $location, AppLogger, QuizService, SessionService) {
	
    var self = this;

	$scope.questionNumber = -1;
    $scope.totalQuestions = -1;
    $scope.progressPercentage = 0;
    $scope.question = {};
    $scope.btnText = "NEXT ";
    $scope.user = null;

	$scope.init = function (){
		AppLogger.log('QuestionController Loaded');
        QuizService.onInit();
        $scope.totalQuestions = QuizService.getQuestionsLength();
        self.getQuestion();        	
	};

    $scope.nextQuestion = function(){
        const answerObj = {questionId: null, answerId: null};
        answerObj.questionId = $scope.question.id;
        answerObj.answerId =   $scope.question.selectedAnswer;
        
        QuizService.storeUserAnswer(answerObj);
        
        if ($scope.questionNumber < QuizService.getQuestionsLength()) {
          $location.path("/question/").search({number: parseInt($scope.questionNumber) + 1});
        } else {
          const response = QuizService.calculateCandidateScore();
          if (1 === response) {
            SessionService.endQuizSession();
            $location.path('/result');
          }
        }
    };

    $scope.prevQuestion = function(){
        const answerObj = {questionId: null, answerId: null};
        answerObj.questionId = $scope.question.id;
        answerObj.answerId =   $scope.question.selectedAnswer;
        
        QuizService.storeUserAnswer(answerObj);
        
        if ($scope.questionNumber > 0) {
          $location.path("/question/").search({number: parseInt($scope.questionNumber) - 1});
        } 
    };

     self.getQuestion = function(){
        var questionNumberObj = $location.search();
        if(undefined !== questionNumberObj){
            $scope.questionNumber = questionNumberObj.number;
            AppLogger.log('Getting Question: #'+$scope.questionNumber);
            try{
                SessionService.quizSessionOver = false;               
                $scope.question = QuizService.getQuestion($scope.questionNumber);
                var userAnswer = QuizService.getCandidateAnswer($scope.questionNumber);
                if(null != userAnswer){
                    $scope.question.selectedAnswer = userAnswer;
                }
                $scope.progressPercentage = (parseInt($scope.questionNumber)/$scope.totalQuestions)*100;
                $scope.progressPercentageStyle = {width: $scope.progressPercentage +'%'};
                if($scope.questionNumber == $scope.totalQuestions){
                    $scope.btnText = "GET RESULT ";
                }
            
            }catch(e){
                alert(e);
                AppLogger.error("Question Not Found");
                $location.path("/home").search('number', null);
            }
        }else{
            alert('System Error!!!');           
            $location.path("/home").search('number', null);
        }
    };

}]);