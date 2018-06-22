'use strict';

angular.module('myApp.config', [])

.service('Config', [function() {

	var me = this;

	this.enableDebug = true;

	this.localStorageKey = "quiz_data";

	function init(){
		if(me.enableDebug){
			console.debug("%c [Config Loaded]: " + new Date(), 'color: #1102A2');
		}
	};

	init();

}]);