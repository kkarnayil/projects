var app = angular.module("bobekart", [ 'ngRoute' ]).config(
		[ '$routeProvider', '$locationProvider',
				function($routeProvider, $locationProvider) {

					$locationProvider.hashPrefix();

					$routeProvider.when('/home', {
						templateUrl : 'view/products.html',
						controller : 'ProductController'
					}).when('/checkout', {
						templateUrl : 'view/checkout.html',
						controller : 'HeaderController'
					}).otherwise({
						redirectTo : '/home'
					});

				}]);

$(document).ready(function() {
	console.info("Document ready.")
});