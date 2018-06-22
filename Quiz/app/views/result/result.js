'use strict';

angular.module('view.result', [])
.config(['$routeProvider', function( $routeProvider) {
  $routeProvider.when('/result', {
    templateUrl: 'views/result/result.html',
    controller: 'ResultController'
  })
}])

.controller('ResultController', ['$scope', '$location', 'QuizService', 'AppLogger', function($scope, $location, QuizService, AppLogger) {
	$scope.user = {};
	$scope.userAnswers = [];
	$scope.questions = [];

	$scope.init = function(){
		AppLogger.log("Result Controller Loaded");
		$scope.user = QuizService.getCandidate();
		$scope.questions = QuizService.getQuestions();
	};

}]);