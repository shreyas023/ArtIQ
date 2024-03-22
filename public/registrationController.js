// app.js
var app = angular.module('myApp', []);

// registrationController.js
app.controller('registrationController', function($scope, $location, authService) {
    $scope.user = { email: "", password: "" }; // Initialize user object

    $scope.register = function() {
        // Call authService to handle registration logic
        authService.register($scope.user).then(function(response) {
            // Handle success
            console.log("Registration successful.");
            $location.path('/login'); // Redirect to login page
        }, function(error) {
            // Handle error
            console.error("Registration failed: ", error);
            // Optionally handle error display or other actions
        });
    };
});

// authService.js (not provided in the code snippet, but needed for registration logic)
app.factory('authService', function($http) {
    var authService = {};

    authService.register = function(user) {
        // Here, you should implement registration logic, e.g., sending data to backend
        // For simplicity, let's assume a dummy implementation here
        return $http.post('/api/register', user); // Assuming '/api/register' is the endpoint for registration
    };

    return authService;
});
