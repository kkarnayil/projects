'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.config',
  'service.logservice',
  'service.quizservice',
  'controller.global',
  'view.home',
  'view.question',
  'view.result',
  'view.results',
  'component.candidateregistration',
  'component.candidatescores',
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/home'});

}]).
run(function ($rootScope) {
    $rootScope.$on('$routeChangeSuccess', function($event, current, previous) {
        if(undefined !== current && undefined !== current.$$route){ 
          $rootScope.$broadcast("pageChanged",current, previous);
      }
    });
});
