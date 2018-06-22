'use strict';

angular.module('view.results', [])
.config(['$routeProvider', function( $routeProvider) {
  $routeProvider.when('/results', {
    templateUrl: 'views/results/results.html',
    controller: 'ResultsController'
  })
}])

.controller('ResultsController', ['$scope', 'AppLogger', function($scope, AppLogger) {

	$scope.init = function(){
		AppLogger.log('Results Controller Loaded');
	};

}]);