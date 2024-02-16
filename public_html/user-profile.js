document.getElementById('deleteAccountBtn').addEventListener('click', function() {
    document.getElementById('deletePopup').style.display = 'block';
  });
  
  document.getElementById('confirmDelete').addEventListener('click', function() {
    var password = document.getElementById('confirmPassword').value;
    // Add the logic to verify the password.
    // If the password is correct, redirect to the login page:
    window.location.href = 'index.html';
  });
  
  document.getElementById('cancelDelete').addEventListener('click', function() {
    document.getElementById('deletePopup').style.display = 'none';
  });
  