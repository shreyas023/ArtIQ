// public/script.js
function register() {
    const regUsername = document.getElementById('regUsername').value;
    const regPassword = document.getElementById('regPassword').value;
  
    fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `username=${encodeURIComponent(regUsername)}&password=${encodeURIComponent(regPassword)}`,
    })
      .then(response => {
        if (response.ok) {
          alert('Registration successful');
        } else {
          alert('Registration failed');
        }
      })
      .catch(error => console.error('Error during registration:', error));
  }
  
  function login() {
    const loginUsername = document.getElementById('loginUsername').value;
    const loginPassword = document.getElementById('loginPassword').value;
  
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `username=${encodeURIComponent(loginUsername)}&password=${encodeURIComponent(loginPassword)}`,
    })
      .then(response => {
        if (response.ok) {
          alert('Login successful');
        } else {
          alert('Login failed');
        }
      })
      .catch(error => console.error('Error during login:', error));
  }
  