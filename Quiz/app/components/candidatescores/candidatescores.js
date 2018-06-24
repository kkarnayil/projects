'use strict';

angular.module("component.candidatescores", [])
  .component("candidateScores",{ 
      templateUrl: 'components/candidatescores/candidatescores.html',
      controller: 'CandidateScoresController',
      bindings: { page: '@' }
 })
 .controller('CandidateScoresController', ['$scope', '$location', 'QuizService', 'AppLogger',function($scope, $location, QuizService, AppLogger) {

	var self = this;

 	$scope.candidates = [];

 	$scope.title = null;

 	$scope.onInit = function(){
 		
 		AppLogger.log('CandidateScores Component Controller Loaded');
 		
 		$scope.candidates = QuizService.getCandidateScores();

 		$scope.candidates.sort(function(candidateA, candidateB){return candidateB.score - candidateA.score});

 		$scope.title = self.page === 'home' ? 'Leaders (Top 5)' : 'Rankings';

 		if(self.page === 'home'){
 			$scope.candidates = $scope.candidates.slice(0,5);
 		}
 	
    };

    
   
}]);