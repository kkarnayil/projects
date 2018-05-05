console.log('App loaded.');

/*global angular */
var quiz_app = angular.module('quiz-app', ['ngRoute']);
console.log('Angular loaded.');

quiz_app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "views/user_registration.html"
        })
        .when("/step1", {
            templateUrl: "views/quiz_step1.html"
        })
        .when("/step2", {
            templateUrl: "views/quiz_step2.html"
        })
        .when("/user_result", {
            templateUrl: "views/user_result.html"
        })
        .when("/user_results", {
            templateUrl: "views/users_result.html"
        });
});
