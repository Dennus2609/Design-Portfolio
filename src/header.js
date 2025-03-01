console.log('Header.js loaded');

export const initMobileMenu = () => {
    const hamburger = document.querySelector('.hamburger-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    const menuOverlay = document.querySelector('.menu-overlay');
    const projectsToggle = document.querySelector('.mobile-nav .projects-toggle');
    const projectsDropdown = document.querySelector('.mobile-nav .projects-dropdown');
    const body = document.body;

    if (hamburger && mobileNav && menuOverlay) {
        // Toggle menu on hamburger click
        hamburger.addEventListener('click', () => {
            body.classList.toggle('menu-active');
            mobileNav.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu on overlay click
        menuOverlay.addEventListener('click', () => {
            closeMenu();
        });

        // Close menu when clicking a link
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                closeMenu();
            });
        });

        // Toggle projects dropdown in mobile menu
        if (projectsToggle && projectsDropdown) {
            projectsToggle.addEventListener('click', (e) => {
                e.preventDefault();
                projectsToggle.classList.toggle('active');
                projectsDropdown.classList.toggle('active');
            });
        }
    }

    // Helper function to close menu
    const closeMenu = () => {
        body.classList.remove('menu-active');
        mobileNav.classList.remove('active');
        menuOverlay.classList.remove('active');
        hamburger.classList.remove('active');
        if (projectsToggle && projectsDropdown) {
            projectsToggle.classList.remove('active');
            projectsDropdown.classList.remove('active');
        }
    };

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && body.classList.contains('menu-active')) {
            closeMenu();
        }
    });
};

// Make sure script runs
console.log('Header script loaded');
initMobileMenu(); 