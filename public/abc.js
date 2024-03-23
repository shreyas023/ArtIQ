// Load users from local storage or initialize an empty array
var users = JSON.parse(localStorage.getItem('users')) || [];


// Function to save users to local storage
function saveUsersToLocalStorage() {
    localStorage.setItem('users', JSON.stringify(users));
}

// Function to handle login
function login(event) {
    event.preventDefault(); // Prevent form submission
    console.log("Users list:");
        users.forEach(function(user) {
            console.log("Username:", user.username, "Password:", user.password);
        });

    // Get username and password from the form
    var oldusername = document.getElementById('username').value;
    var oldpassword = document.getElementById('password').value;
    var name = document.getElementById('newname').value;

    // Check if the username and password match any user in the list
    var user = users.find(function(user) {
        return user.username === oldusername && user.password === oldpassword;
    });

    // If a user is found, log them in
    if (user) {
        console.log("Users list:");
        users.forEach(function(user) {
            console.log("Username:", user.username, "Password:", user.password);
        });
        alert('Login successful!');
        // You can redirect to another page or perform any other action here
        window.location.href = 'ok.html?name=' + encodeURIComponent(name);
    } else {
        // If no user is found, display an error message
        var loginError = document.getElementById('login-error');
        loginError.textContent = 'Invalid username or password';
    }
}

// Function to handle signup
function signup(event) {
    event.preventDefault(); // Prevent form submission

    // Get new username and password from the form
    var newUsername = document.getElementById('new-username').value;
    var newPassword = document.getElementById('new-password').value;
    var name = document.getElementById('name').value;

    // Check if the username is already taken
    var existingUser = users.find(function(user) {
        return user.username === newUsername;
    });

    // If the username is already taken, display an error message
    if (existingUser) {
        var signupSuccess = document.getElementById('signup-success');
        signupSuccess.textContent = 'Username already exists. Please choose another one.';
    } else {
        // Add the new user to the list
        users.push({ username: newUsername, password: newPassword });
        saveUsersToLocalStorage(); // Save updated users list to local storage
        console.log("Users list:");
        users.forEach(function(user) {
            console.log("Username:", user.username, "Password:", user.password);
        });

        // Display success message
        var signupSuccess = document.getElementById('signup-success');
        signupSuccess.textContent = 'Sign up successful!';
        // You may want to clear the form here if needed
        alert('Sign up successful!');
        window.location.href = 'ok.html?name=' + encodeURIComponent(name); // Redirect to ok.html with the user's name;
    }
}

// Add event listener to the signup form
document.getElementById('signup-form').addEventListener('submit', signup);

// Add event listener to the login form
document.getElementById('login-form').addEventListener('submit', login);
