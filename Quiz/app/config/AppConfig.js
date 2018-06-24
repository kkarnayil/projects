'use strict';

angular.module('myApp.config', [])

.service('Config', [function() {

	var me = this;

	this.enableDebug = true;

	this.localStorageKey = "quiz_data";

	this.userSessionKey = "quiz_user_session";

	this.questionAccessKey = "quiz_question_access";

	this.restrictedPages = ["/question","/result"];

	function init(){
		if(me.enableDebug){
			console.debug("%c [Config Loaded]: " + new Date(), 'color: #1102A2');
		}
	};

	init();

}]);