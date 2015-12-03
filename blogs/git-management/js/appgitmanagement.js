var app = angular.module('chatApp', ['firebase']);

app.controller('chatController', ['$scope', 'Message', function ($scope, Message) {

    var defaultForm = {
        name: "",
        email: "",
        comment: ""
    };

    $scope.user = "Guest";

    $scope.messages = Message.all;

    $scope.inserisci = function (message) {
        Message.create(message);
        $scope.newmessage = defaultForm;
    };
 }]);

app.factory('Message', ['$firebase',
 function ($firebase) {
        var ref = new Firebase('https://mainportfolio.firebaseio.com/githubmanagement');
        var messages = $firebase(ref.child('messages')).$asArray();

        var Message = {
            all: messages,
            create: function (message) {
                return messages.$add(message);
            },
            get: function (messageId) {
                return $firebase(ref.child('messages').child(messageId)).$asObject();
            },
            delete: function (message) {
                return messages.$remove(message);
            }
        };

        return Message;

 }
 ]);

//http://www.codetutorial.io/chat-app-with-angularjs-and-firebase/