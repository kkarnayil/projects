app.service('AjaxService', function() {

	console.log("Ajax Service Loaded: "+ new Date());

	const CONTENT_TYPE = 'application/json; charset=utf-8';
	
	this.API_CREATE_ACCOUNT = 'rest/user/create';
	this.API_VALIDATE_USER  = 'rest/user/validate';
	this.API_LIST_USERS     = 'rest/user/list';
	this.API_UPDATE_USER    = 'rest/user/update';
	this.API_DELETE_USER    = 'rest/user/delete';
	this.API_DELETE_ALL     = 'rest/user/delete/all';
	
	this.METHOD_POST   = 'POST';
	this.METHOD_GET    = 'GET';
	this.METHOD_PUT    = 'PUT';
	this.METHOD_DELETE = 'DELETE';
	

	this.doAjax = function(_url, _type, _data, _callback) {
	console.log("Ajax Service: doAjax("+_url+"): "+ new Date());
		var serviceData = null == _data ? null : JSON.stringify(_data);

		$.ajax({
			url : _url,
			type : _type,
			data : serviceData,
			contentType : CONTENT_TYPE,
			success : function(result) {
				_callback(result);
			},
			error : function(jqXhr, textStatus, errorThrown) {
				alert(errorThrown);
			}
		});
	};
});
