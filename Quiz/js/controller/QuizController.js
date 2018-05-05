/**
 * Controller handling App logics
 * @private
 * @method controller
 * @param {Object} 'QuizController'
 * @param {Object} ['$scope'
 * @param {Object} '$location'
 * @param {Object} 'QuizService'
 */
quiz_app.controller('QuizController', ['$scope', '$location', 'QuizService', function ($scope, $location, QuizService) {
    console.log('Quiz Controller loaded.');

    $scope.user = {
        email: "",
        name: "",
        score: 0
    };
    $scope.questions = [];
    $scope.usersScores = [];
    $scope.isHome = "active";


    /**
     * Method to register user
     * @private
     * @method registerUser
     */
    $scope.registerUser = function () {
        console.log("Controller register user: " + JSON.stringify($scope.user));
        QuizService.registerUser($scope.user, function (response) {
            console.log("Callback received...");
            $location.path("/step1");
        });

    };

    /**
     * Method to get the Questions
     * @private
     * @method getQuestions
     * @return [] od question
     */
    $scope.getQuestions = function () {
        $scope.questions = QuizService.getQuestions();
    };

    /**
     * Method to calculate score of the user
     * @private
     * @method calculateScore
     */
    $scope.calculateScore = function () {
        console.log("Calculate Score called...");
        $scope.user.score = 0;
        for (var i = 0; i < $scope.questions.length; i++) {

            if (undefined != $scope.questions[i].selectedAnswer) {

                if ($scope.questions[i].correctAnswer === parseInt($scope.questions[i].selectedAnswer)) {
                    $scope.user.score++;
                }
            }
        }
        QuizService.submitUserScore($scope.user);
        $location.path("/user_result");
    };

    /**
     * Method to get all user scores
     * @private
     * @method getUsersScore
     * @return [] of users scores.
     */
    $scope.getUsersScore = function () {
        $scope.usersScores = QuizService.getUserScores();
        $scope.usersScores.sort(sortScore);
        $scope.isHome = "";
        $scope.isResults = "active";
    };

    /**
     * Method called on template load
     * @private
     * @method init
     */
    $scope.init = function () {
        $scope.user = {
            email: "",
            name: "",
            score: 0
        };
        $scope.isHome = "active";
        $scope.isResults = "";
    };

    /**
     * Description for sortScore
     * @private
     * @method sortScore
     * @param {Object} a
     * @param {Object} b
     * @return {Object} description
     */
    var sortScore = function (a, b) {
        var aScore = a.score;
        var bScore = b.score;
        return ((aScore < bScore) ? 1 : ((aScore > bScore) ? -1 : 0));
    }
}]);
