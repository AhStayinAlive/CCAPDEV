document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    // Simulate successful registration
    alert('Registration successful!');

    // Redirect to index.html
    window.location.href = 'index.html';
});
