angular.module('service.sessionservice', [])

.service('SessionService', ['Config', 'AppLogger', function (Config, AppLogger) {
	var self = this;
	var currentUser = null;
	var isAuthenticated = false;
	
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

	this.signIn = function(user, promise){
		currentUser = user;
		localStorage.setItem(Config.userSessionKey, JSON.stringify(user));
		isAuthenticated = true;
		self.startQuizSession();
		promise({'status':200});
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
		AppLogger.log("Has Questions Access: "+ localStorage.getItem(Config.questionAccessKey));
		return localStorage.getItem(Config.questionAccessKey);
	};

	this.endQuizSession = function(){
		localStorage.removeItem(Config.questionAccessKey);
	};

	this.startQuizSession = function(){
		localStorage.setItem(Config.questionAccessKey, true);
	};

	this.getAllCandidateScores = function(){
		return localStorage.getItem(Config.localStorageKey);
	};


}]);