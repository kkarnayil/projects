'use strict';

angular.module('controller.global', ['ngSanitize'])

.controller('GlobalController', ['$rootScope', '$scope', '$location', 'AppLogger', 'SessionService', function($rootScope, $scope, $location, AppLogger, SessionService) {
	
	AppLogger.log("Global Controller Loaded");

	$scope.isHome = 'active';
	$scope.isResults = '';
	$scope.user = null;
	$scope.styleClass = "col-md-6";

	$rootScope.$on("pageChanged", function(evt, current, previous){ 
		if('/results' === current.$$route.originalPath){
			$scope.isResults = 'active';
			$scope.isHome = '';
		}else{
			$scope.isResults = '';
			$scope.isHome = 'active';
		}

		SessionService.init();

		$scope.user = SessionService.getUser();

		$scope.isLoggedIn = SessionService.isAuthenticated();
		if($scope.isLoggedIn){
			$scope.styleClass = "col-md-12";
		}else{
			$scope.styleClass = "col-md-6";
		}

	});

	$scope.onInit = function(){

		$scope.brand = "KOKO Quiz";

		$scope.footerCopy = "&copy; Copyright 2058, KOKO Corporation";
		
	};

	$scope.signOut = function (){
		SessionService.signOut();
		$location.path("/signout").search('number', null);
	}

}]);