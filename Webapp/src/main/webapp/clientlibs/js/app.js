var app = angular.module("webapp", [ "ngRoute" ]);
console.log("Angular Loaded: "+ new Date());
app.config([ '$routeProvider', '$locationProvider',
		function($routeProvider, $locationProvider) {
			$routeProvider.when("/", {
				templateUrl : "views/login.html",
				controller  : "LoginController as $ctrl",
				resolve : {
					"check" : function($location) {
						var userData = localStorage.getItem("loggedInUser");
						if (null != userData) {
							$location.path('/home');
						} else {
							$location.path('/');
						}

					}
				}
			}).when("/home", {
				templateUrl : "views/home.html",
				controller  : "GlobalController",
				resolve : {
					"check" : function($location) {
						var userData = localStorage.getItem("loggedInUser");
						if (null != userData) {
							$location.path('/home');
						} else {
							console.error('No Permission to access the page: '+new Date());
							$location.path('/');
						}

					}
				}
			}).when("/profile", {
				templateUrl : "views/profile.html",
				controller  : "GlobalController",
				resolve : {
					"check" : function($location) {
						var userData = localStorage.getItem("loggedInUser");
						if (null != userData) {
							$location.path('/profile');
						} else {
							console.error('No Permission to access the page: '+new Date());
							$location.path('/');
						}

					}
				}
			}).when("/task", {
				templateUrl : "views/task.html",
				controller  : "GlobalController",
				resolve : {
					"check" : function($location) {
						var userData = localStorage.getItem("loggedInUser");
						if (null != userData) {
							$location.path('/task');
						} else {
							console.error('No Permission to access the page: '+new Date());
							$location.path('/');
						}

					}
				}
			}).otherwise({
				redirectTo : '/'
			});

		} ]);
