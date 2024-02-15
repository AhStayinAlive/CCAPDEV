// Data Models
const labs = [
    { id: 'Lab A', seats: 10, operatingHours: { start: 9, end: 17 } },
    { id: 'Lab B', seats: 10, operatingHours: { start: 9, end: 17 } },
    { id: 'Lab C', seats: 10, operatingHours: { start: 9, end: 17 } }
];

let users = []; // Array to hold both student and technician users
let reservations = []; // Array to manage detailed reservations

// Utility function to generate unique IDs for users and reservations
function generateId() {
    return Math.random().toString(36).substr(2, 9);
}

// Function to handle user registration
// TODO: Replace this with a secure server-side registration logic
function registerUser(email, password, role) {
    if (users.some(user => user.email === email)) {
        // TODO: Update the UI to inform the user that the email is already in use
        return false;
    }
    const newUser = {
        id: generateId(),
        email,
        password, // TODO: Passwords should be hashed before storing
        role,
        reservations: []
    };
    users.push(newUser);
    // TODO: Implement successful registration logic, such as redirecting to the dashboard
    return true;
}

// Function to handle user login
// TODO: Replace this with a secure server-side login logic
function loginUser(email, password) {
    const user = users.find(user => user.email === email && user.password === password); // TODO: Use hashed password comparison
    if (user) {
        // TODO: Implement successful login logic, such as setting up a user session and redirecting to the dashboard
        return user;
    } else {
        // TODO: Update the UI to inform the user of a login failure
        return null;
    }
}

// Function to toggle the visibility of the password in the login form
function togglePasswordVisibility() {
    var passwordInput = document.getElementById('loginPassword');
    var toggleSpan = document.querySelector('.show-password');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleSpan.textContent = 'Hide';
    } else {
        passwordInput.type = 'password';
        toggleSpan.textContent = 'Show';
    }
}

// Function to handle lab reservations
// TODO: Replace this with server-side logic and real-time availability checks
function reserveLab(userId, labId, timeSlot, anonymous = false) {
    const reservation = {
        id: generateId(),
        userId,
        labId,
        timeSlot,
        anonymous
    };
    // TODO: Check if the seat is available before confirming the reservation
    reservations.push(reservation);
}

// Application Initialization
function initApp() {
    // TODO: Implement any initial setup required when the application loads
}

// Event handler for login form submission
function handleLoginSubmit(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    if (loginUser(email, password)) {
        // TODO: Redirect the user to their dashboard or the next page
    } else {
        // TODO: Display an error message to the user in the UI
    }
}

// TODO: Add the handleRegisterSubmit function if you have a registration form

// Wait for the DOM to be fully loaded before initializing the app
document.addEventListener('DOMContentLoaded', initApp);
