var Utils = new function () {

    //method to clear all inputs
    this.clearInputs = function () {
        $("input[type='text']").val("");
        $("input[type='checkbox']").prop('checked', false);
        $("input[name='gender'][value='Male']").prop('checked', true);

    };


    this.getGUID = function guid() {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    };

    var s4 = function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    };

}