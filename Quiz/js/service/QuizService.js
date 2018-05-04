quiz_app.service('QuizService', function(){
    
    console.log("Quiz Service loaded.");

    var user_data = {user:null, quiz_data:null};

    var users_scores = [];

    var questions = [{ "id": 1, "question": "capital of india",  "correctAnswer": 3, "options": [{ "id": 1, "option": "mumbai" }, { "id": 2, "option": "pune" }, { "id": 3, "option": "delhi" }, { "id": 4, "option": "bangalore" } ] },
                     { "id": 2, "question": "capital of maharashtra", "correctAnswer": 1, "options": [{ "id": 1, "option": "mumbai" }, { "id": 2, "option": "pune" }, { "id": 3, "option": "satara" }, { "id": 4, "option": "kolhapur" } ] },
                     { "id": 3, "question": "capital of karnataka", "correctAnswer": 2, "options": [{ "id": 1, "option": "mumbai" }, { "id": 2, "option": "bangalore" }, { "id": 3, "option": "satara" }, { "id": 4, "option": "kolhapur" } ] },
                     { "id": 4, "question": "capital of kerala", "correctAnswer": 2, "options": [{ "id": 1, "option": "mumbai" }, { "id": 2, "option": "trivandrum" }, { "id": 3, "option": "satara" }, { "id": 4, "option": "kolhapur" } ] }
                    ];

    this.registerUser = function(user, promise){
        console.log("Service register user: "+ JSON.stringify(user));
        user_data.user = user;
        promise();
    };

    this.getQuestions = function(){
        var _questions =  jQuery.extend(true, [], questions);
        return _questions;
    };

    this.submitUserScore = function(user){
        var _user = jQuery.extend(true, {}, user);
        users_scores.push(_user);
    };

    this.getUserScores = function(){
        return users_scores;
    };

});


