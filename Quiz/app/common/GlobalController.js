'use strict';

angular.module('controller.global', ['ngSanitize'])

.controller('GlobalController', ['$rootScope', '$scope', '$location', 'AppLogger' , function($rootScope, $scope, $location, AppLogger) {
	
	AppLogger.log("Global Controller Loaded");

	$scope.isHome = 'active';
	$scope.isResults = '';

	$rootScope.$on("pageChanged", function(evt, current, previous){ 
		if('/results' === current.$$route.originalPath){
			$scope.isResults = 'active';
			$scope.isHome = '';
		}else{
			$scope.isResults = '';
			$scope.isHome = 'active';
		}
	});

	$scope.onInit = function(){

		var path = $location.path();

		$scope.brand = "KOKO Quiz";

		$scope.footerCopy = "&copy; Copyright 2058, KOKO Corporation";
	};

}]);