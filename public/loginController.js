var app=angular.module('myApp', []);

// loginController.js
app.controller('loginController', function($scope, $location, authService) {
    $scope.login = function(isValid) {
      if (isValid) {
        authService.login($scope.user).then(function(isValidUser) {
          if (isValidUser) {
            $location.path('/home');
          } else {
            alert('Invalid credentials');
          }
        });
      }
    };
  });
  