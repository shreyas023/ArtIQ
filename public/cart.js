

document.getElementById('payment_form').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    console.log(formData);
    fetch('/payment', {
        method: 'POST',
        body: formData
    }).then(response => {
        if (response.ok) {
            alert("Payment successful!");
            window.location.href = 'homepage.html?name=' + encodeURIComponent(formData.get('fname'));
            console.log("successfully entered into database");
        } else {
            alert("Payment failed.");
            console.error("Failed to submit data to the server.");
        }
    }).catch(error => {
        console.error("Error:", error);
    });
});
