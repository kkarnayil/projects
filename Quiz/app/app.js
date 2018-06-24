'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.config',
  'service.logservice',
  'service.quizservice',
  'service.sessionservice',
  'controller.global',
  'view.home',
  'view.question',
  'view.result',
  'view.results',
  'component.candidateregistration',
  'component.candidatescores',
  'component.candidatescore'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/home'});

}]).
run(['AppLogger', 'SessionService', '$rootScope', '$location', function (AppLogger, SessionService, $rootScope, $location) {

    $rootScope.$on('$routeChangeStart', function($event, next, current) {
        if(undefined !== next && undefined !== next.$$route){ 
          let routeInfo = next.$$route;
          if(routeInfo.originalPath){
            if(SessionService.isRestrictedPage(routeInfo.originalPath) && !SessionService.isAuthenticated()){
              AppLogger.error('Page Access Denied');
              $event.preventDefault();
              $location.path('/access-denied');
            }

            if('/question' === routeInfo.originalPath){
                if(!SessionService.canAccessQuiz()){
                  AppLogger.error('Quiz Session Over. Page Access Denied');
                  $event.preventDefault();
                  $location.path('/access-denied');
                }
            }

            if('/result' === routeInfo.originalPath){
                if(SessionService.canAccessQuiz()){
                  AppLogger.error('Quiz Session Over. Page Access Denied');
                  $event.preventDefault();
                  $location.path('/access-denied');
                }
            }

          }
      }
    });

    $rootScope.$on('$routeChangeSuccess', function($event, current, previous) {
        if(undefined !== current && undefined !== current.$$route){ 
          $rootScope.$broadcast("pageChanged",current, previous);
      }
    });
}]);
