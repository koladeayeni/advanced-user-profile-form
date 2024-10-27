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
    const fullName = sanitizeInput(document.getElementById('fullName').value);
    const address = sanitizeInput(document.getElementById('address').value);
    const phoneNumber = document.getElementById('phoneNumber').value;
    const password = document.getElementById('password').value;
    
    // Validate phone number
    if (!validatePhoneNumber(phoneNumber)) {
        alert("Please enter a valid 10-digit phone number.");
        return false;
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Sending the sanitized and validated data securely
    console.log({
        fullName,
        address,
        phoneNumber,
        hashedPassword,
        profilePicture: document.getElementById('profilePicture').files[0] // Profile picture file
    });

    alert("Form submitted successfully!");

    // Prevent the default form submission to allow for custom handling
    return false;
}
