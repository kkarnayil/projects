app.controller('GlobalController', [ '$scope', '$location', 'UserService',
		function($scope, $location, UserService) {
			console.log("Global Controller Loaded: "+ new Date());
			$scope.homeTab = '';
			$scope.profileTab = '';
			
			$scope.users = [];
				
			var userData = localStorage.getItem("loggedInUser");
			if(null != userData){
			var userObj = JSON.parse(userData);
			$scope.username = userObj.firstName.toUpperCase() + " " + userObj.lastName.toUpperCase();
			$scope.emailId = userObj.emailId;
			$scope.firstName = userObj.firstName;
			$scope.lastName =  userObj.lastName;
			}
			
			$scope.logout = function() {
				console.log("Global Controller: Logout Clicked: "+ new Date());

				localStorage.removeItem("loggedInUser");
				$location.path("/");
			};
			
			
			$scope.listAllUsers = function(){
				if(null != userData){
				console.log("Global Controller: List All users: "+ new Date());

				UserService.listAllUsers(function(usersList){
					$scope.users = usersList;
					$scope.$apply();
				});
				}
			};
			
			$scope.updateUser = function(){
				var user = {};
				user.firstName = $scope.firstName;
				user.lastName = $scope.lastName;
				user.emailId = $scope.emailId;
				
				UserService.updateUser(user, function(result, isSuccess){
					if(isSuccess){
						console.log("User Update Success:" + new Date());
						localStorage.setItem("loggedInUser", JSON
								.stringify(result));
						
						$('#profileUpdateModal').modal('show');
					}else{
						console.error("Incorrect Old Password: "+new Date());
						$('#errorModal').modal('show');
					}
					$scope.$apply();
				});
			};
			
			$scope.refreshPage = function(takeHome){
				if(takeHome != null){
					$('#profileUpdateModal').modal('hide');
					$('body').removeClass('modal-open');
					$('.modal-backdrop').remove();
					$location.path('/');					
				}else{
					location.reload();
				}		
			};
			
			
			this.handleNavigation = function(){
				console.log("Redirecting to "+ $location.path() +": "+new Date());
				
				if($location.path() == '/home'){			
					$scope.homeTab = 'active';
					$scope.profileTab = '';
					$scope.taskTab = '';
				}else if($location.path() == '/profile'){
					$scope.homeTab = '';
					$scope.profileTab = 'active';
					$scope.taskTab = '';
				}else if($location.path() == '/task'){
					$scope.homeTab = '';
					$scope.profileTab = '';
					$scope.taskTab = 'active';
				}
			}
			
			this.handleNavigation();
}]);