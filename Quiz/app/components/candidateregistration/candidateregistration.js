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
	        score: 0
	    };
        QuizService.reset();
    }

    /**
     * Method to register user
     * @private
     * @method registerCandidate
     */
    $scope.registerCandidate = function () {
        AppLogger.log("Register user: " + JSON.stringify($scope.user));
        QuizService.registerUser($scope.user, function (response) {
            SessionService.startQuizSession();
            AppLogger.log("Register User response: " + JSON.stringify(response));
            $location.path("/question/").search({number: 1});                
        });
    };

}]);