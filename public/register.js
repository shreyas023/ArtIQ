document.getElementById('register-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(formData)
    }).then(response => {
        // window.location.href = 'homepage.html';
        console.log("successfully registered");
    });
});
