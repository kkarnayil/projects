/**
 *  Controller to handler view operations
 */
var AppController = new function () {

    console.log("Controller loaded.");

    /*
     * Method to Add User
     */
    this.addUser = function () {
        console.log("Controller Add User Function.");
        UserService.addUser();
        UserService.populateUserTable();
    };

    /**
     * Method to Edit user
     * @param ref
     */
    this.editUser = function (ref) {
        var userId = $(ref).attr("value");
        console.log("Controller Edit User Function. ID: " + userId);
        UserService.editUser(userId);

    };

    /**
     * Method to Delete User
     * @param ref
     */
    this.deleteUser = function (ref) {
        var userId = $(ref).attr("value");
        console.log("Controller Delete User Function. ID: " + userId);
        UserService.deleteUser(userId);
        UserService.populateUserTable();

    };

    /**
     * Method to clear form inputs.
     */
    this.clearForm = function () {
        Utils.clearInputs();
    };

};

