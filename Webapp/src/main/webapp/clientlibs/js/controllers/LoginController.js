app.controller('LoginController', [
	    '$scope',
		'$location',
		'UserService',
		function($scope, $location, UserService) {
			console.log("Login Controller Loaded: "+ new Date());

			var user;

			$scope.showCreateAccount = false;
			$scope.errorMsg = '';

			$scope.createUserAccount = function() {
				console.log("LoginController: createUserAccount(): "+ new Date());
				user = {};
				user.firstName = $scope.firstName;
				user.lastName = $scope.lastName;
				user.passWord = $scope.password;
				user.emailId = $scope.emailId;

				UserService.createUserAccount(user, function(response, isSuccess) {
					if(isSuccess){
						console.log("User Create Success:" + new Date());
						localStorage.setItem("loggedInUser", JSON
								.stringify(response));
						$scope.errorMsg = '';
						$location.path("/home");
					}else{
						$scope.errorMsg = response;
						console.error(response+": "+ new Date());
					}
					$scope.$apply();
				});
			};
			
			$scope.validateUser = function(){
				console.log("Login Controller: validateUser(): "+ new Date());
				user = {};
				user.emailId = $scope.emailId;
				user.passWord = $scope.password;
				
				UserService.validateUser(user, function(response, isValidUser) {
					if(isValidUser){
						console.log("User Login Success:" + new Date());
						localStorage.setItem("loggedInUser", JSON
								.stringify(response));
						$scope.errorMsg = '';
						$location.path("/home")	
					}else{
						$scope.errorMsg = response;
						console.error(response+": "+ new Date());
					}
					$scope.$apply();
				});
				
				
			}
		}]);