'use strict';

angular.module('service.logservice', [])

.service('AppLogger', ['Config', function(Config) {

	this.isDebugEnabled = Config.enableDebug;

	this.log = function(message){
		if(this.isDebugEnabled){
			console.log("%c ["+message+"]:"+ new Date(), 'color: #1102A2');
		}
	};

	this.error = function(message){
		if(this.isDebugEnabled){
			console.log("%c ["+message+"]:"+ new Date(), 'color: #C70039');
		}
	}

	

}]);