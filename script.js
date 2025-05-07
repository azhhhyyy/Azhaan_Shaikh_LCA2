// dom for profile button
const profileBtn = document.getElementById('profile-btn');
// dom for sticky search
const stickySearch = document.querySelector('.sticky-search');
// variable for last scroll top
let lastScrollTop = 0;

// profil button click handler
profileBtn.addEventListener('click', () => {
    window.location.href = 'profile.html';
});

// event listener for the sidebar menu
document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const sidebarMenu = document.getElementById('sidebar-menu');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const mainContent = document.querySelector('.main-content');

    // Toggle sidebar 
    const toggleMenu = () => {
        sidebarMenu.classList.toggle('active');
        sidebarOverlay.classList.toggle('active');
        menuBtn.classList.toggle('open');
        document.body.style.overflow = sidebarMenu.classList.contains('active') ? 'hidden' : '';
    };

    menuBtn.addEventListener('click', toggleMenu);
    closeMenuBtn.addEventListener('click', toggleMenu);
    sidebarOverlay.addEventListener('click', toggleMenu);

    //hamburger menu icon animation
    menuBtn.innerHTML = `
        <span class="line"></span>
        <span class="line"></span>
        <span class="line"></span>
    `;
});

// sticky search scroll function
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop) {
        // Scrolling down
        stickySearch.classList.add('hidden');
    } else {
        // Scrolling up
        stickySearch.classList.remove('hidden');
    }
    
    lastScrollTop = scrollTop;
});

// Make place cards clickable to navigate to detail page
const placeCards = document.querySelectorAll('.place-card');
placeCards.forEach(card => {
    card.addEventListener('click', () => {
        window.location.href = 'place-detail.html';
    });
});