var StorageService = new function () {

    console.log("Store Service loaded.");

    //local storage key.
    const STORAGE_KEY = "users";

    //variable to store user data.
    var users;

    /**
     * On load function to read data from local storage.
     */
    this.init = function () {
        var data = localStorage.getItem(STORAGE_KEY);
        if (null != data) {
            users = JSON.parse(data);
        } else {
            users = [];
        }
    };

    /**
     * Method to add user to storage
     * @param user
     */
    this.addUser = function (user, isEdit) {
        if(!isEdit) {
            users.push(user);
        }else{
            for (var i = 0; i < users.length; i++) {
                //if user matched, then replace new data with old data.
                if (user.id == users[i].id) {
                    users[i] = user;
                    break;
                }
            }
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    };

    /**
     * Method to get all the users.
     * @returns users
     */
    this.getUsers = function () {
        return users;
    };

    /**
     * Method to get user for given id.
     * @param id of the user
     */
    this.getUser = function (id) {

        //iterate users and check each id
        for (var i = 0; i < users.length; i++) {
            if (id == users[i].id) {
                //return if match found.
                return users[i];
            }
        }
        //return null if no user found with given id.
        return null;
    };

    /**
     * Method to delete user for given id.
     * @param id of the user.
     */
    this.deleteUser = function (id) {
        var isDeleted = false;
        //iterate users and check each id
        for (var i = 0; i < users.length; i++) {
            if (id == users[i].id) {
                //if id matches, then delete from users array
                users.splice(i, 1);
                isDeleted = true;
                break;
            }
        }

        if (isDeleted) {
            //if deleted then update local storage.
            localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
            return 1;
        }

        return 0;

    }

    /**
     * Method to get user count.
     */
    this.getUserCount = function () {
        return users.length;
    };

    //call init method on class load.
    this.init();

};