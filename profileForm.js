// Validate phone number format
function validatePhoneNumber(phone) {
    const phonePattern = /^\d{10}$/;
    return phonePattern.test(phone);
}

// Sanitize text inputs
function sanitizeInput(input) {
    const temp = document.createElement('div');
    temp.textContent = input;
    return temp.innerHTML;
}

// Hash password using SHA-256
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
}

// Handle form submission
async function handleFormSubmission() {
    const firstName = sanitizeInput(document.getElementById('firstName').value);
    const lastName = sanitizeInput(document.getElementById('lastName').value);
    const email = sanitizeInput(document.getElementById('email').value);
    const street = sanitizeInput(document.getElementById('street').value);
    const city = sanitizeInput(document.getElementById('city').value);
    const state = sanitizeInput(document.getElementById('state').value);
    const zip = sanitizeInput(document.getElementById('zip').value);
    const phoneNumber = document.getElementById('phoneNumber').value;
    const password = document.getElementById('password').value;

    // Validate phone number
    if (!validatePhoneNumber(phoneNumber)) {
        alert("Please enter a valid 10-digit phone number.");
        return false;
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    console.log({
        firstName,
        lastName,
        email,
        street,
        city,
        state,
        zip,
        phoneNumber,
        hashedPassword,
        profilePicture: document.getElementById('profilePicture').files[0] // Profile picture file
    });

    alert("Form submitted successfully!");
    return false;
}

// Save data to session storage
function saveDataToSession() {
    const fields = ['firstName', 'lastName', 'email', 'street', 'city', 'state', 'zip', 'phoneNumber'];
    fields.forEach(field => {
        const value = document.getElementById(field).value;
        sessionStorage.setItem(field, value);
    });
    alert('Data saved to session storage!');
}

// Load data from session storage
function loadDataFromSession() {
    const fields = ['firstName', 'lastName', 'email', 'street', 'city', 'state', 'zip', 'phoneNumber'];
    fields.forEach(field => {
        const storedValue = sessionStorage.getItem(field);
        document.getElementById(field).value = storedValue || '';
    });
    alert('Data loaded from session storage!');
}

// Clear data from session storage and clear form fields
function clearSessionData() {
    sessionStorage.clear();
    const fields = ['firstName', 'lastName', 'email', 'street', 'city', 'state', 'zip', 'phoneNumber'];
    fields.forEach(field => {
        document.getElementById(field).value = ''; // Clear each form field
    });
    alert('Session storage and form fields cleared!');
}

// // Load data on page load if there is data in session storage
// window.onload = function() {
//     if (sessionStorage.length > 0) {
//         loadDataFromSession();
//     }
// };