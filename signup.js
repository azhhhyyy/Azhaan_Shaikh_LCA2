// DOM Elements
const signupForm = document.getElementById('signup-form');
const fullnameInput = document.getElementById('fullname');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const socialButtons = document.querySelectorAll('.social-btn');

// User data management functions
function storeUserData(userData) {
    // Get existing users or initialize empty object
    const users = JSON.parse(localStorage.getItem('users')) || {};
    
    // Store user data with email as key
    users[userData.email] = {
        fullname: userData.fullname,
        email: userData.email,
        password: userData.password, // In a real app, this should be hashed
        phone: userData.phone,
        profilePicture: 'https://placehold.co/150x150' // Initialize with default picture
    };
    
    // Save back to localStorage
    localStorage.setItem('users', JSON.stringify(users));
    
    // Also store current user session
    localStorage.setItem('currentUser', JSON.stringify({
        fullname: userData.fullname,
        email: userData.email,
        phone: userData.phone,
        profilePicture: 'https://placehold.co/150x150' // Initialize with default picture
    }));
}

function validateUser(phone, password) {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    const user = users[phone];
    
    if (!user) {
        return false; // User not found
    }
    
    return user.password === password; // In a real app, compare hashed passwords
}

// Form submission
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const fullname = fullnameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    
    // Validate form
    if (!fullname || !email || !phone || !password || !confirmPassword) {
        showError('Please fill in all fields');
        return;
    }
    
    if (!isValidEmail(email)) {
        showError('Please enter a valid email address');
        return;
    }
    
    if (!isValidPhone(phone)) {
        showError('Please enter a valid phone number');
        return;
    }
    
    if (password.length < 8) {
        showError('Password must be at least 8 characters long');
        return;
    }
    
    if (password !== confirmPassword) {
        showError('Passwords do not match');
        return;
    }
    
    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('users')) || {};
    if (users[email]) {
        showError('An account with this email already exists');
        return;
    }
    
    // Store user data
    storeUserData({
        fullname,
        email,
        phone,
        password
    });
    
    // Simulate successful signup
    showSuccess('Account created successfully!');
    
    // Redirect to index.html after successful signup
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
});

// Social login buttons
socialButtons.forEach(button => {
    button.addEventListener('click', () => {
        const provider = button.classList.contains('google-btn') ? 'Google' : 'Facebook';
        console.log(`${provider} signup clicked`);
        
        // Simulate social signup
        showSuccess(`${provider} signup initiated`);
        
        // In a real app, you would redirect to OAuth provider
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    });
});

// Helper functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

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
    signupForm.appendChild(errorElement);
    
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
    signupForm.appendChild(successElement);
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signup-form');
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const nextStepBtn = document.querySelector('.next-step');
    const backStepBtn = document.querySelector('.back-step');
    const reviewEmail = document.getElementById('review-email');
    const reviewPhone = document.getElementById('review-phone');
    
    // Toggle password visibility
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
    
    // Handle next step
    nextStepBtn.addEventListener('click', function() {
        const fullname = document.getElementById('fullname').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        
        // Basic validation
        if (!fullname || (!email && !phone)) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Update review section
        if (email) {
            reviewEmail.textContent = email;
            reviewPhone.textContent = '';
        } else {
            reviewEmail.textContent = '';
            reviewPhone.textContent = phone;
        }
        
        // Switch steps
        step1.classList.remove('active');
        step2.classList.add('active');
    });
    
    // Handle back step
    backStepBtn.addEventListener('click', function() {
        step2.classList.remove('active');
        step1.classList.add('active');
    });
    
    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const terms = document.getElementById('terms').checked;
        
        // Validate password
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        
        if (!terms) {
            alert('Please agree to the Terms of Service and Privacy Policy');
            return;
        }
        
        // Here you would typically send the data to your server
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        console.log('Form data:', data);
        // Add your API call here
        
        // Show success message or redirect
        alert('Account created successfully!');
        window.location.href = 'index.html';
    });
}); 