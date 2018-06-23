'use strict';

angular.module('view.results', [])
.config(['$routeProvider', function( $routeProvider) {
  $routeProvider.when('/results', {
    templateUrl: 'views/results/results.html'
  })
}])
