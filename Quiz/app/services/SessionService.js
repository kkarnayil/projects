angular.module('service.sessionservice', [])

.service('SessionService', ['Config', 'AppLogger', function (Config, AppLogger) {

	var currentUser = null;
	var isAuthenticated = false;
	var quizAccess = false;

	this.init = function(){
		
		if(null != currentUser && currentUser.email){
			isAuthenticated = true;
			return;
		}else{
			const userSession = localStorage.getItem(Config.userSessionKey);
    		if (null != userSession || undefined !=  userSession) {
    			isAuthenticated = true;
      			currentUser = JSON.parse(userSession);     			
			}else{
				isAuthenticated = false;
				currentUser = null;
			}
		}

		AppLogger.log("Session Loaded: Is Authenticate: "+ isAuthenticated);

	}

	this.signIn = function(user){
		currentUser = user;
		localStorage.setItem(Config.userSessionKey, JSON.stringify(user));
		isAuthenticated = true;
	};

	this.signOut = function(){
		AppLogger.log("Session Logout");
		currentUser = null;
		isAuthenticated = false;
		localStorage.removeItem(Config.userSessionKey);

	};

	this.isAuthenticated = function(){
		return isAuthenticated;
	};

	this.getUser =  function(){
		return currentUser;
	};

	this.isRestrictedPage = function(page){
		if(Config.restrictedPages.indexOf(page) >=0){
			return true;
		}else{
			return false;
		}
	};

	this.canAccessQuiz = function(){
		return quizAccess;
	}

	this.endQuizSession = function(){
		quizAccess = false;
	};

	this.startQuizSession = function(){
		quizAccess = true;
	};


}]);