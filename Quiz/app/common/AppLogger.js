'use strict';

angular.module('service.logservice', [])

.service('AppLogger', ['Config', function(Config) {

	this.isDebugEnabled = Config.enableDebug;

	this.log = function(message){
		if(this.isDebugEnabled){
			console.debug("%c ["+message+"]:"+ new Date(), 'color: #1102A2');
		}
	}

	

}]);