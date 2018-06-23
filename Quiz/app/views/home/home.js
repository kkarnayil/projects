'use strict';

angular.module('view.home', [])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'views/home/home.html'
  })
}])
