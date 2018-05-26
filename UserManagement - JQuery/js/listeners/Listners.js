(function bindListeners() {

    $(document).on("click", "#addUserBtn", function () {
        AppController.addUser();
    });

    $(document).on("click", "#editUserBtn", function (event) {
        AppController.editUser(this);
    });

    $(document).on("click", "#deleteUserBtn", function (event) {
        AppController.deleteUser(this);
    });

    $(document).on("click", "#clearFormBtn", function (event) {
        AppController.clearForm();
    });


})();