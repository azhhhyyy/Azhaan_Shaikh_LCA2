// DOM Elements
const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const togglePasswordBtn = document.querySelector('.toggle-password');
const rememberCheckbox = document.getElementById('remember');
const socialButtons = document.querySelectorAll('.social-btn');
const signupLink = document.querySelector('.signup-link');

// Toggle password visibility
function togglePasswordVisibility(button) {
    const input = button.previousElementSibling;
    const icon = button.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// click event listener to password toggle button
if (togglePasswordBtn) {
    togglePasswordBtn.addEventListener('click', () => togglePasswordVisibility(togglePasswordBtn));
}

// validation of user credentials
function validateUser(email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    
    // find user by email
    const user = Object.values(users).find(u => u.email === email);
    
    if (!user) {
        return { valid: false, message: 'No account found with this email' };
    }
    
    if (user.password !== password) {
        return { valid: false, message: 'Incorrect password' };
    }
    
    return { valid: true, user };
}

// form submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const rememberMe = rememberCheckbox.checked;
    
    // Basic validation
    if (!email || !password) {
        showError('Please fill in all fields');
        return;
    }
    
    // Validate credentials
    const validation = validateUser(email, password);
    
    if (validation.valid) {
        // Store current user session with complete user data including profile picture
        const userData = {
            fullname: validation.user.fullname,
            email: validation.user.email,
            phone: validation.user.phone,
            profilePicture: validation.user.profilePicture || 'https://placehold.co/150x150' // Use default if no picture
        };
        
        localStorage.setItem('currentUser', JSON.stringify(userData));
        
        // Show success message
        showSuccess('Login successful!');
        
        // Redirect to home page
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    } else {
        showError(validation.message);
    }
});

// Social login buttons
socialButtons.forEach(button => {
    button.addEventListener('click', () => {
        const provider = button.classList.contains('google-btn') ? 'Google' : 'Facebook';
        console.log(`${provider} login clicked`);
        
        // Simulate social login
        showSuccess(`${provider} login initiated`);
        
        // In a real app, you would redirect to OAuth provider
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    });
});

// Sign up link
signupLink.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('Sign up clicked');
    
    // In a real app, you would redirect to sign up page
    alert('Sign up functionality would be implemented here');
});

// Helper functions
function isValidPhone(phone) {
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    return phoneRegex.test(phone);
}

function showError(message) {
    // Create error message element
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = 'red';
    errorElement.style.fontSize = '14px';
    errorElement.style.marginTop = '8px';
    
    // Remove any existing error messages
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error message to form
    loginForm.appendChild(errorElement);
    
    // Remove error after 3 seconds
    setTimeout(() => {
        errorElement.remove();
    }, 3000);
}

function showSuccess(message) {
    // Create success message element
    const successElement = document.createElement('div');
    successElement.className = 'success-message';
    successElement.textContent = message;
    successElement.style.color = 'green';
    successElement.style.fontSize = '14px';
    successElement.style.marginTop = '8px';
    successElement.style.textAlign = 'center';
    
    // Remove any existing messages
    const existingMessage = document.querySelector('.success-message, .error-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Add success message to form
    loginForm.appendChild(successElement);
}

// Check if there's a saved email in localStorage
window.addEventListener('DOMContentLoaded', () => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
        emailInput.value = savedEmail;
        rememberCheckbox.checked = true;
    }
});