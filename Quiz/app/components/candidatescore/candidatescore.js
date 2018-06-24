'use strict';

angular.module("component.candidatescore", [])
  .component("candidateScore",{
      templateUrl: 'components/candidatescore/candidatescore.html',
      controller: 'CandidateScoreController',
      bindings: { page: '@' }
 })
 .controller('CandidateScoreController', ['$scope', '$location', 'SessionService', 'AppLogger',function($scope, $location, SessionService, AppLogger) {

 	$scope.onInit = function(){		
 		AppLogger.log('CandidateScore Component Controller Loaded');		
 		$scope.candidate = SessionService.getUser();
    
  };

    $scope.startQuiz = function(){
    	AppLogger.log('Take Quiz');		
    	 SessionService.startQuizSession();
    	 $location.path("/question/").search({number: 1});
    };

}]);