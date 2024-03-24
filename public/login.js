var users = JSON.parse(localStorage.getItem('users')) || [];

function saveUsersToLocalStorage() {
    localStorage.setItem('users', JSON.stringify(users));
}

function login(event) {
    event.preventDefault();

    var oldusername = document.getElementById('username').value;
    var oldpassword = document.getElementById('password').value;
    var name = document.getElementById('new-name').value;

    if(name===null)
    {
        name="guest";
    }

    var user = users.find(function(user) {
        return user.username === oldusername && user.password === oldpassword;
    });

    if (user) {
        console.log("Users list:");
        users.forEach(function(user) {
            console.log("Username:", user.username, "Password:", user.password);
        });
        alert('Login successful!');
        window.location.href = 'homepage.html?name=' + encodeURIComponent(name);
    } else {
        var loginError = document.getElementById('error-message');
        loginError.textContent = 'Invalid username or password';
    }
}

function signup(event) {
    event.preventDefault(); 

    var newUsername = document.getElementById('new-username').value;
    var newPassword = document.getElementById('new-password').value;
    var name = document.getElementById('name').value;

    var existingUser = users.find(function(user) {
        return user.username === newUsername;
    });

    if (existingUser) {
        var signupSuccess = document.getElementById('success-message');
        signupSuccess.textContent = 'Username already exists. Try login.';
    } else {
        users.push({ username: newUsername, password: newPassword });
        saveUsersToLocalStorage(); 
        console.log("Users list:");
        users.forEach(function(user) {
            console.log("Username:", user.username, "Password:", user.password);
        });

        var signupSuccess = document.getElementById('success-message');
        signupSuccess.textContent = 'Sign up successful!';
        alert('Registered successful!');
        window.location.href = 'homepage.html?name=' + encodeURIComponent(name); // Redirect to ok.html with the user's name;
    }
}

document.getElementById('register-form').addEventListener('submit', signup);

document.getElementById('login-form').addEventListener('submit', login);
