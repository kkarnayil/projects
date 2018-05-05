app.service('UserService', [
		'AjaxService',
		function(AjaxService) {
			console.log("UserService Loaded: "+ new Date())

			//method to create user account.
			this.createUserAccount = function(userObj, callback) {
				console.log("UserService: createUserAccount(): "+ new Date());
				AjaxService.doAjax(AjaxService.API_CREATE_ACCOUNT,
						AjaxService.METHOD_POST, userObj, function(result) {
							if (result.code == 200) {
								var responseObj = result.response;
								callback(responseObj, true);
							} else {
								callback(result.status, false);
							}
						});
			};

			//method to validate user.
			this.validateUser = function(userObj, callback) {
				console.log("UserService: validateUser(): "+ new Date());
				AjaxService.doAjax(AjaxService.API_VALIDATE_USER,
						AjaxService.METHOD_POST, userObj, function(result) {
							if (result.code == 200) {
								var response = result.response;
								callback(response, true);
							} else {
								callback(result.status, false);
							}
						});
			};
			
			
			//method to get all users.
			this.listAllUsers = function(callback) {
				console.log("UserService: listAllUsers(): "+ new Date());
				AjaxService.doAjax(AjaxService.API_LIST_USERS,
						AjaxService.METHOD_GET, null, function(result) {
							if (result.code == 200) {
								var response = result.response;
								callback(response, true);
							} else {
								console.log(result)
							}
						});
			};
			
			this.updateUser = function(userObject, callback){
				console.log("UserService: updateUser(): "+ new Date());
				AjaxService.doAjax(AjaxService.API_UPDATE_USER,
						AjaxService.METHOD_PUT, userObject, function(result) {
							if (result.code == 200) {
								var response = result.response;
								callback(response, true);
							} else {
								callback(response, false);
							}
						});
			};
			
		} ]);