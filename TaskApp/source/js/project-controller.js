"use strict";

var projectController = new function() {

    var STORAGE_KEY = "projects";

    var id = 0;

    /**
     *
     * Method to add project
     */
    this.addProject = function(projectName) {

        var tableRow = '<tr class="projectRow" id="project' + (++id) + '">' +
            '<td>' + projectName + '</td>' + '<td class="action" colspan="2"><input id="' + id + '" class="completeBtn" type="button" value="Done"/><input id="' + id + '" class="deleteBtn" type="button" value="X"/></td>' +
            '</tr>';

        $('#newProjectsTable').append(tableRow);

        $('#newProjectsTableNoData').addClass('hideTable');

        updateCount();

        addNewProjectToLocalStorage(tableRow, id);

    };

    /**
     *
     * Method to mark project as complete.
     */
    this.markProjectAsComplete = function(buttonRef) {

        var projectId = $(buttonRef).attr("id");

        var projectRow = $("#project" + projectId);

        var projectName = $(projectRow).text();

        var tableRow = '<tr>' +
            '<td class="">' + projectName +
            '<input id="' + projectId + '" class="deleteBtn2" type="button" value="X"/></td>'+
            '</tr>';

        $('#completedProjectsTable').append(tableRow);

        $('#completedProjectsTableNoData').addClass('hideTable');

        $('#completedProjectsTable').removeClass('hideTable');

        moveNewProjectToLocalStorage(tableRow, projectId);
        removeNewProject(projectId);
    };

    /**
     *
     * Method to Remove Project from Progress.
     */
    this.removeProjectFromProgress = function(buttonRef) {

        $(buttonRef).closest('tr').remove();

        var projectId = $(buttonRef).attr("id");

        var storage = JSON.parse(localStorage.getItem(STORAGE_KEY));

        for (var j = 0; j < storage.newProjects.length; j++) {
            if(projectId == storage.newProjects[j].id){
                storage.newProjects.splice(j,1);
                break;
            }
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));

        var count = updateCount();


        if (count == 0) {
            $('#newProjectsTableNoData').removeClass('hideTable');
        }

    };

    this.removeProjectFromCompleted = function(buttonRef){

      $(buttonRef).closest('tr').remove();

      var projectId = $(buttonRef).attr("id");

      var storage = JSON.parse(localStorage.getItem(STORAGE_KEY));

      for (var j = 0; j < storage.completedProjs.length; j++) {
          if(projectId == storage.completedProjs[j].id){
              storage.completedProjs.splice(j,1);
              break;
          }
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));

      if(storage.completedProjs.length == 0){
        $('#completedProjectsTableNoData').removeClass('hideTable');
      }


    }

    /**
     *
     * Method to Read Project from localStorage.
     */
    this.readLocalStorageInfo = function() {

        var projects = localStorage.getItem(STORAGE_KEY);

        if (null != projects) {
            projects = JSON.parse(projects);
            id = projects.id;
            for (var i = 0; i < projects.newProjects.length; i++) {
                var tableRow = projects.newProjects[i].content;
                $('#newProjectsTable').append(tableRow);
                $('#newProjectsTableNoData').addClass('hideTable');
                updateCount();
            }

            for (var j = 0; j < projects.completedProjs.length; j++) {
                var completedProjsRow = projects.completedProjs[j];
                $('#completedProjectsTable').append(completedProjsRow.content);
                $('#completedProjectsTableNoData').addClass('hideTable');
            }
        }



    }

    /**
     *
     * Method to update Count
     */
    var updateCount = function() {

        var projectCount = $('#newProjectsTable tr.projectRow').length;

        $(".projectCount").text(projectCount);

        return projectCount;
    };

    /**
     *
     * Method to add Project into localStorage
     */
    var addNewProjectToLocalStorage = function(tableRow, id) {

        var storage = JSON.parse(localStorage.getItem(STORAGE_KEY));

        var tableRowObj = {};
        tableRowObj.id = id;
        tableRowObj.content = tableRow;

        if (null == storage) {
            var tempObj = {};
            var tempArr = [];
            var completedProjs = [];
            tempArr.push(tableRowObj);
            tempObj.id = id;
            tempObj.newProjects = tempArr;
            tempObj.completedProjs = completedProjs;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(tempObj));
        } else {
            storage.newProjects.push(tableRowObj);
            storage.id = id;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
        }
    };

    /**
     *
     * Method to add project to completed projects list in localStorage
     */
    var moveNewProjectToLocalStorage = function(tableRow, rowId) {

        var storage = JSON.parse(localStorage.getItem(STORAGE_KEY));

        var tableRowObj = {};
        tableRowObj.id = rowId;
        tableRowObj.content = tableRow;

        storage.completedProjs.push(tableRowObj);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));

    }

    /**
     *
     * Method to remove projects from new projects in localStorage
     */
    var removeNewProject = function(projectId) {
        var storage = JSON.parse(localStorage.getItem(STORAGE_KEY));
        var newProjects = storage.newProjects;
        for (var i = 0; i < newProjects.length; i++) {
            if (projectId == newProjects[i].id) {
                newProjects.splice(i, 1);
                break;
            }
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));

    }

}
