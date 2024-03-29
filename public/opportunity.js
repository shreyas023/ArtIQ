document.getElementById('teacher_submit').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    console.log(formData);
    fetch('/teacher', {
        method: 'POST',
        body: formData
    }).then(response => {
        if (response.ok) {
            alert("Your course will be reviewed and approved soon!");
            window.location.href = 'homepage.html?name=' + encodeURIComponent(formData.get('Name'));
            console.log("successfully entered into database");
        } else {
            alert("Course name is already taken.");
            console.error("Failed to submit data to the server.");
        }
    }).catch(error => {
        console.error("Error:", error);
    });
});
