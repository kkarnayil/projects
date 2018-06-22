'use strict';

angular.module('view.question', [])
.config(['$routeProvider', function( $routeProvider) {
  $routeProvider.when('/question', {
    templateUrl: 'views/question/question.html',
    controller: 'QuestionController'
  })
}])

.controller('QuestionController', ['$scope', '$location', 'AppLogger', 'QuizService', function($scope, $location, AppLogger, QuizService) {
	
	$scope.questionNumber = -1;
    $scope.totalQuestions = -1;
    $scope.progressPercentage = 0;
    $scope.question = {};

	$scope.init = function (){
		AppLogger.log('QuestionController Loaded');
        $scope.totalQuestions = QuizService.getQuestionsLength();
		getQuestion();
        	
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
            $location.path('/result');
          }
        }
    };

    var getQuestion = function(){
        var questionNumberObj = $location.search();
        if(undefined !== questionNumberObj){
            $scope.questionNumber = questionNumberObj.number;
            AppLogger.log('Getting Question: #'+$scope.questionNumber);
            try{              
                $scope.question = QuizService.getQuestion($scope.questionNumber);
                $scope.progressPercentage = (parseInt($scope.questionNumber)/$scope.totalQuestions)*100;
                $scope.progressPercentageStyle = {width: $scope.progressPercentage +'%'};
            
            }catch(e){
                alert(e);
                $location.path("/home").search('number', null);
            }
        }else{
            alert('System Error!!!');           
            $location.path("/home").search('number', null);
        }
    };

}]);