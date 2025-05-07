// DOM Elements
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const fixedVisitBtn = document.getElementById('fixed-visit-btn');

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
        
        // Hide fixed visit button when on visit tab
        if (tabId === 'visit') {
            fixedVisitBtn.style.display = 'none';
        } else {
            fixedVisitBtn.style.display = 'block';
        }
    });
});

// Make fixed visit button navigate to visit tab
fixedVisitBtn.addEventListener('click', () => {
    // Find and click the visit tab button
    const visitTabBtn = document.querySelector('[data-tab="visit"]');
    visitTabBtn.click();
});

document.addEventListener('DOMContentLoaded', function() {
    const saveBtn = document.getElementById('save-btn');
    const saveIcon = saveBtn.querySelector('i');
    
    // Check if the place is saved in localStorage
    const isSaved = localStorage.getItem('savedPlaces') && 
                   JSON.parse(localStorage.getItem('savedPlaces')).includes('shaniwar-wada');
    
    // Set initial state
    if (isSaved) {
        saveBtn.classList.add('active');
        saveIcon.classList.remove('far');
        saveIcon.classList.add('fas');
    }
    
    saveBtn.addEventListener('click', function() {
        // Toggle the active state
        this.classList.toggle('active');
        
        // Toggle the icon between outline and filled
        saveIcon.classList.toggle('far');
        saveIcon.classList.toggle('fas');
        
        // Get current saved places or initialize empty array
        let savedPlaces = JSON.parse(localStorage.getItem('savedPlaces') || '[]');
        
        if (this.classList.contains('active')) {
            // Add to saved places if not already saved
            if (!savedPlaces.includes('shaniwar-wada')) {
                savedPlaces.push('shaniwar-wada');
            }
        } else {
            // Remove from saved places
            savedPlaces = savedPlaces.filter(place => place !== 'shaniwar-wada');
        }
        
        // Save back to localStorage
        localStorage.setItem('savedPlaces', JSON.stringify(savedPlaces));
    });
});