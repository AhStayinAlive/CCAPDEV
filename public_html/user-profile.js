// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Edit Profile button event
    document.getElementById('editProfileBtn').addEventListener('click', function() {
      document.getElementById('editProfileForm').style.display = 'block';
    });
  
    // Change Password button event within the form
    document.getElementById('changePasswordBtn').addEventListener('click', function() {
      document.getElementById('currentPasswordPopup').style.display = 'block';
    });
  
    document.getElementById('editProfileBtn').addEventListener('click', function() {
        // Populate form fields with current data
        document.getElementById('profileNameInput').value = document.getElementById('profileName').textContent;
        document.getElementById('contactNumberInput').value = document.getElementById('contactNumber').textContent;
        document.getElementById('emailInput').value = document.getElementById('email').textContent;
        document.getElementById('biographyInput').value = document.getElementById('biography').textContent;
        
        // Display the form
        document.getElementById('editProfileForm').style.display = 'block';
      });      

    // Confirm Current Password button event
    document.getElementById('confirmPasswordBtn').addEventListener('click', function() {
        var currentPassword = document.getElementById('currentPasswordInput').value;
        var newPassword = document.getElementById('newPasswordInput').value;
        // Here you would verify the current password and then update to the new password on the server
        // After updating the password:
        hideCurrentPasswordPopup();
        // You may want to add feedback for the user here, like an alert or a message showing success/failure
    });
  
  
    // Saving changes (submitting the edit profile form)
    document.getElementById('profileForm').addEventListener('submit', function(event) {
      event.preventDefault();
      // Process form data and send to server
      hideEditProfileForm();
      // Handle response and update UI accordingly
    });
  
    // Delete Account button event
    document.getElementById('deleteAccountBtn').addEventListener('click', function() {
      document.getElementById('deletePopup').style.display = 'block';
    });
  
    // Confirm Delete button event
    document.getElementById('confirmDelete').addEventListener('click', function() {
      var password = document.getElementById('confirmPassword').value;
      // Verify the password and handle the delete action
      window.location.href = 'index.html';
    });
  
    // Cancel Delete button event
    document.getElementById('cancelDelete').addEventListener('click', function() {
      document.getElementById('deletePopup').style.display = 'none';
    });
  });
  
  function hideEditProfileForm() {
    document.getElementById('editProfileForm').style.display = 'none';
  }
  
  function hideCurrentPasswordPopup() {
    document.getElementById('currentPasswordPopup').style.display = 'none';
  }
  