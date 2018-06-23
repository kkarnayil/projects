'use strict';

angular.module('view.result', [])
.config(['$routeProvider', function( $routeProvider) {
  $routeProvider.when('/result', {
    templateUrl: 'views/result/result.html',
    controller: 'ResultController',
    authenticationRequired : true
  })
}])

.controller('ResultController', ['$scope', '$location', 'SessionService','QuizService', 'AppLogger', function($scope, $location, SessionService, QuizService, AppLogger) {
	$scope.user = {};
	$scope.userAnswers = [];
	$scope.questions = [];

	$scope.init = function(){
		AppLogger.log("Result Controller Loaded");
		SessionService.endQuizSession();
		$scope.user = SessionService.getUser();
		$scope.questions = QuizService.getQuestions();
	};

}]);