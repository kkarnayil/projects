'use strict';

angular.module('controller.global', ['ngSanitize'])

.controller('GlobalController', ['$rootScope', '$scope', '$location', 'AppLogger', 'SessionService', function($rootScope, $scope, $location, AppLogger, SessionService) {
	
	AppLogger.log("Global Controller Loaded");

	$scope.isHome = 'active';
	$scope.isResults = '';
	$scope.user = null;

	$rootScope.$on("pageChanged", function(evt, current, previous){ 
		if('/results' === current.$$route.originalPath){
			$scope.isResults = 'active';
			$scope.isHome = '';
		}else{
			$scope.isResults = '';
			$scope.isHome = 'active';
		}
		$scope.user = SessionService.getUser();

		$scope.isLoggedIn = SessionService.isAuthenticated();		

	});

	$scope.onInit = function(){

		SessionService.init();

		$scope.brand = "KOKO Quiz";

		$scope.footerCopy = "&copy; Copyright 2058, KOKO Corporation";
		
	};

	$scope.signOut = function (){
		SessionService.signOut();
		$location.path("/signout").search('number', null);
	}

}]);