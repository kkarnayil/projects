"use strict";

$(document).ready(function(){

	var version = localStorage.getItem("app_version");
	if(version == undefined){
		if(localStorage.getItem("projects") != null){
			alert("App Updated!! Clearing Data.");
			localStorage.removeItem("projects");
		}
		localStorage.setItem("app_version","1.1");
	}
	init();

});

/**
*
* Method to init enter press event
*
**/
function init(){

	$("#projectForm").submit(function(e){
		var projectName = $("#projectInput").val();
		projectController.addProject(projectName);
		$('#projectInput').val("");
		e.preventDefault();

	});

	$(document).on("click", ".completeBtn", function(){

		projectController.markProjectAsComplete($(this));
		projectController.removeProjectFromProgress($(this));

	});

	$(document).on("click", ".deleteBtn", function(){
			projectController.removeProjectFromProgress($(this));
	});

	$(document).on("click", ".deleteBtn2", function(){
			projectController.removeProjectFromCompleted($(this));
	});



	projectController.readLocalStorageInfo();

}
