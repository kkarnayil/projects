/**
 * Logging service
 * 
 */
app.service('LogService', [ '$log', function($log) {

	this.info = function(message) {
		$log.info("[" + new Date() + "] " + message);
	};
	
	this.debug = function(message) {
		$log.debug(message);
	};
	
	this.error = function(message) {
		$log.error("[" + new Date() + "] " + message);
	};

}]);
