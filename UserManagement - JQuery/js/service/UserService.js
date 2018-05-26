var UserService = new function () {
    console.log("User Service loaded.");

    var editUserId;
    /**
     *  Service method to add user
     */
    this.addUser = function () {
        var isEdit = false;
        console.log("Service Add User.");

        var firstName = $("#firstName").val();
        var lastName = $("#lastName").val();

        //if not empty
        if ((firstName.trim()) && (lastName.trim())) {
            var hobbies = [];
            $.each($("input[name='hobbies']:checked"), function () {
                hobbies.push($(this).val());
            });
            var gender = $("input[name='gender']:checked").val();

            var id;

            if(undefined == editUserId || null == editUserId){
                id = Utils.getGUID();
            }else{
                id = editUserId;
                isEdit = true;
            }

            var user = new User(id, firstName, lastName, hobbies, gender);
            StorageService.addUser(user, isEdit);
            Utils.clearInputs();
        } else {
            alert("First name & Last name cannot be empty!")
        }

    };

    /*
     * Method to populate User Table
     */
    this.populateUserTable = function () {
        editUserId = null;
        $("#usersTable").html("");
        var users = StorageService.getUsers();
        for (var i = 0; i < users.length; i++) {
            var tableRow =
                '<tr>' +
                '<th scope="row" class="hideFromMobile">' + (i + 1) + '</th>' +
                '<td>' + users[i].firstName + '</td>' +
                '<td>' + users[i].lastName + '</td>' +
                '<td>' + getHobbies(users[i].hobbies) + '</td>' +
                '<td>' + users[i].gender + '</td>' +
                '<td>' +
                '<button id="editUserBtn" value="' + users[i].id + '" type="button" class="btn btn-primary">Edit</button>' +
                '<button id="deleteUserBtn" value="' + users[i].id + '" type="button" class="btn btn-danger leftmargin3 mobiletopmargin2"> X</button>' +
                '</td>' +
                '</tr>';

            $("#usersTable").append(tableRow);
        }

        if (users.length == 0) {
            $("#noUsersRow").removeClass("hide");
        } else if (!$("#noUsersRow").hasClass("hide")) {
            $("#noUsersRow").addClass("hide");
        }

    };

    /**
     * Method to populate form based on userId
     * @param userId
     */
    this.editUser = function (userId) {
        Utils.clearInputs();
        var user = StorageService.getUser(userId);
        $("#firstName").val(user.firstName);
        $("#lastName").val(user.lastName);
        var hobbies = user.hobbies;
        for (var i = 0; i < hobbies.length; i++) {
            $("input[value='" + hobbies[i] + "']").prop('checked', true);
        }

        editUserId = userId;
    };

    /**
     * Method to delete user.
     * @param userId
     */
    this.deleteUser = function (userId) {

        StorageService.deleteUser(userId);

    };

    /**
     * Method to convert array to comma separated String.
     * @param hobbies
     * @returns {string}
     */
    var getHobbies = function (hobbies) {
        var hobbiesStr = "";
        if (null != hobbies && hobbies.length > 0) {
            for (var i = 0; i < hobbies.length; i++) {
                hobbiesStr += hobbies[i];
                if (i == hobbies.length - 1) {
                    continue;
                } else {
                    hobbiesStr += ", ";
                }
            }
        } else {
            hobbiesStr = "No Hobbies :(";
        }
        return hobbiesStr;
    }

    //call method on load.
    this.populateUserTable();

};