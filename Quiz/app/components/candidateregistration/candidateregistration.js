'use strict';

angular.module("component.candidateregistration", [])
  .component("candidateRegistration",{
      templateUrl: 'components/candidateregistration/candidateregistration.html',
      controller: 'CandidateRegistrationController'
 })
 .controller('CandidateRegistrationController', ['$scope', '$location', 'QuizService', 'SessionService', 'AppLogger',function($scope, $location,  QuizService, SessionService, AppLogger) {

 	AppLogger.log('Candidate Registration Component Controller Loaded');
    
 	$scope.init = function(){
	 	$scope.user = {
	        email: "",
	        name: "",
            candidateAnswers: [],
	        score: 0
	    };
    };

    /**
     * Method to register user
     * @private
     * @method registerCandidate
     */
    $scope.registerCandidate = function () {
        AppLogger.log("Register Candidate Request: " + JSON.stringify($scope.user));
            SessionService.signIn($scope.user, function(response){
                 AppLogger.log("Register Candidate Response:" + JSON.stringify(response));
                 $location.path("/question/").search({number: 1});    
            });                             
    };

}]);