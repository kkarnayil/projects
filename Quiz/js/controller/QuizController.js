/**
 *
 */
quiz_app.controller('QuizController', ['$scope', '$location' , 'QuizService', function($scope, $location, QuizService){
    console.log('Quiz Controller loaded.');
    this.test = "test controller";

    $scope.user = {email:"enter email", name:"enter name", score:0};
    $scope.questions = [];
    $scope.usersScores = [];

    /**
     *
     */
    $scope.registerUser = function(){
        console.log("Controller register user: "+ JSON.stringify($scope.user));
        QuizService.registerUser($scope.user, function(response){
            console.log("Callback received...");
            $location.path("/step1");
        });

    };

    $scope.getQuestions = function(){
        $scope.questions =  QuizService.getQuestions();
    };

    $scope.calculateScore = function(){
        console.log("Calculate Score called...");
       $scope.user.score = 0;
       for(var i = 0 ;  i < $scope.questions.length ; i++){

           if(undefined != $scope.questions[i].selectedAnswer) {

               if ($scope.questions[i].correctAnswer === parseInt($scope.questions[i].selectedAnswer)) {
                   $scope.user.score ++;
               }
           }
       }
        QuizService.submitUserScore($scope.user);
        $location.path("/user_result");
    };

    $scope.getUsersScore = function(){
        $scope.usersScores = QuizService.getUserScores();
    }

}]);