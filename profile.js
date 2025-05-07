// DOM Elements
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const editProfileBtn = document.querySelector('.edit-profile-btn');
const editAvatarBtn = document.querySelector('.edit-avatar-btn');
const avatarUpload = document.getElementById('avatar-upload');
const profileAvatarImg = document.getElementById('profile-avatar-img');
const wishlistBtns = document.querySelectorAll('.wishlist-btn');
const reviewActionBtns = document.querySelectorAll('.review-action-btn');
const loadMoreBtn = document.querySelector('.load-more-btn');
const photoItems = document.querySelectorAll('.photo-item');
const userNameElement = document.getElementById('user-name');

// Check if user is logged in and update profile
function updateProfileInfo() {
    console.log('Updating profile info...');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log('Current user data:', currentUser);
    
    if (!currentUser) {
        console.log('No user logged in, redirecting to login page');
        window.location.href = 'login.html';
        return;
    }
    
    // Update profile information
    if (userNameElement) {
        console.log('Updating user name to:', currentUser.fullname);
        userNameElement.textContent = currentUser.fullname;
    } else {
        console.log('User name element not found');
    }
    
    // Update profile picture if available
    if (currentUser.profilePicture) {
        profileAvatarImg.src = currentUser.profilePicture;
    }
    
    // Update profile email if available
    const profileEmail = document.querySelector('.profile-email');
    if (profileEmail && currentUser.email) {
        profileEmail.textContent = currentUser.email;
    }
    
    // Update profile phone if available
    const profilePhone = document.querySelector('.profile-phone');
    if (profilePhone && currentUser.phone) {
        profilePhone.textContent = currentUser.phone;
    }
}

// Handle profile picture upload
function handleProfilePictureUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
    }

    const reader = new FileReader();
    
    // Show loading state
    profileAvatarImg.classList.add('loading');
    
    reader.onload = function(e) {
        // Update the image
        profileAvatarImg.src = e.target.result;
        profileAvatarImg.classList.remove('loading');
        
        // Save to localStorage
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            currentUser.profilePicture = e.target.result;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            
            // Update users object
            const users = JSON.parse(localStorage.getItem('users')) || {};
            if (users[currentUser.email]) {
                users[currentUser.email].profilePicture = e.target.result;
                localStorage.setItem('users', JSON.stringify(users));
            }
        }
    };
    
    reader.onerror = function() {
        profileAvatarImg.classList.remove('loading');
        profileAvatarImg.classList.add('error');
        alert('Error reading the file');
    };
    
    reader.readAsDataURL(file);
}

// Tab switching functionality
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        const tabId = button.getAttribute('data-tab');
        document.getElementById(`${tabId}-content`).classList.add('active');
    });
});

// Edit profile button
editProfileBtn.addEventListener('click', () => {
    // In a real app, this would open a modal or navigate to an edit profile page
    alert('Edit profile functionality would be implemented here');
});

// Edit avatar button
editAvatarBtn.addEventListener('click', () => {
    // In a real app, this would open a file picker
    avatarUpload.click();
});

// Wishlist buttons
wishlistBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.classList.toggle('active');
        
        // Update the heart icon
        const heartIcon = btn.querySelector('i');
        if (btn.classList.contains('active')) {
            heartIcon.className = 'fas fa-heart';
        } else {
            heartIcon.className = 'far fa-heart';
        }
    });
});

// Review action buttons
reviewActionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const action = btn.textContent.trim().includes('Edit') ? 'edit' : 'delete';
        const reviewItem = btn.closest('.review-item');
        const placeName = reviewItem.querySelector('.review-place-title').textContent;
        
        if (action === 'edit') {
            // In a real app, this would open an edit review form
            alert(`Edit review for ${placeName}`);
        } else {
            // Confirm before deleting
            if (confirm(`Are you sure you want to delete your review for ${placeName}?`)) {
                // In a real app, this would send a delete request to the server
                reviewItem.style.opacity = '0.5';
                setTimeout(() => {
                    reviewItem.remove();
                }, 500);
            }
        }
    });
});

// Load more button
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
        // In a real app, this would load more places from the server
        loadMoreBtn.textContent = 'Loading...';
        
        // Simulate loading delay
        setTimeout(() => {
            loadMoreBtn.textContent = 'No more places to load';
            loadMoreBtn.disabled = true;
        }, 1500);
    });
}

// Photo items
photoItems.forEach(item => {
    item.addEventListener('click', () => {
        const placeName = item.querySelector('.photo-place').textContent;
        // In a real app, this would open a lightbox or navigate to the place
        alert(`View photos for ${placeName}`);
    });
});

// Add animation when scrolling
window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.place-card, .review-item, .photo-item');
    
    elements.forEach(element => {
        const position = element.getBoundingClientRect();
        
        // If element is in viewport
        if (position.top < window.innerHeight && position.bottom >= 0) {
            element.classList.add('visible');
        }
    });
});

// Initialize profile when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing profile...');
    // Update profile with user data
    updateProfileInfo();
    
    // Add logout functionality
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Clear current user data
            localStorage.removeItem('currentUser');
            // Redirect to login page
            window.location.href = 'login.html';
        });
    }
    
    // Handle profile picture upload
    if (editAvatarBtn && avatarUpload) {
        editAvatarBtn.addEventListener('click', () => {
            avatarUpload.click();
        });
        
        avatarUpload.addEventListener('change', handleProfilePictureUpload);
    }
});