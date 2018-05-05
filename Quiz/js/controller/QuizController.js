/**
 *
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
     *
     */
    $scope.registerUser = function () {
        console.log("Controller register user: " + JSON.stringify($scope.user));
        QuizService.registerUser($scope.user, function (response) {
            console.log("Callback received...");
            $location.path("/step1");
        });

    };

    $scope.getQuestions = function () {
        $scope.questions = QuizService.getQuestions();
    };

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

    $scope.getUsersScore = function () {
        $scope.usersScores = QuizService.getUserScores();
        $scope.usersScores.sort(sortScore);
        $scope.isHome = "";
        $scope.isResults = "active";
    };

    $scope.init = function () {
        $scope.user = {
            email: "",
            name: "",
            score: 0
        };
        $scope.isHome = "active";
        $scope.isResults = "";
    };

    var sortScore = function (a, b) {
        var aScore = a.score;
        var bScore = b.score;
        return ((aScore < bScore) ? 1 : ((aScore > bScore) ? -1 : 0));
    }
}]);
