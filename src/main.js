import './styles.css'
// import { initMobileMenu } from './header';

// Simple video initialization
const video = document.querySelector('.hero-video');
if (video) {
    video.play().catch(error => console.log('Video play error:', error));
}

// Remove the DOMContentLoaded delay
document.body.classList.add('loaded');

// Show initial hero text with animation
document.addEventListener('DOMContentLoaded', () => {
    const heroText = document.querySelector('.hero-text');
    if (heroText) {
        setTimeout(() => {
            heroText.classList.add('visible');
        }, 100);
    }
});

// Define content for each tab
const tabContents = {
    'For Anybody': `I am a
Multidisciplinary
designer based out
of Dubai. I Currently
lead design at Dubai
Police`,
    'Recruiters': 'I am a creative with over Four years of experience across brand and product, at companies large and small. ',
    'Project Manager': 'I thrive in structured collaborations,from defining scope to final delivery, I’ll ensure a seamless, impactful outcome.',
    'Website & App dev': 'I design and develop Websites and apps , from wireframes to production—ready code ensuring seamless digital experiences across platforms.',
    'Branding': 'I craft cohesive brand identities that stand out. From logos to full brand systems, I focus on storytelling and consistency to leave a memorable impression.',
    'Motion graphics': 'I bring ideas to life through movement and sound. Using tools like After Effects and Premiere Pro, I transform static concepts into story driven animations.',
    'Video production': 'From concept to final edit, I handle the entire video pipeline—storyboarding, filming, editing, and post production to deliver narratives that captivate and inform.',
    '3D design': 'I create immersive 3D experiences using Blender, Spline, and Unreal Engine—exploring everything from playful animations to realistic simulations.'
};

// Handle navigation clicks and content updates with smooth transitions
const handleTabChange = (item) => {
    const heroText = document.querySelector('.hero-text');
    if (!heroText) return;

    // Remove active class from all items
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    
    // Add active class to clicked item
    item.classList.add('active');

    // Fade out current content
    heroText.classList.remove('visible');
    
    // Wait for fade out, then update content and fade in
    setTimeout(() => {
        const newContent = tabContents[item.textContent];
        if (item.textContent === 'For Anybody') {
            heroText.innerHTML = newContent; // Use innerHTML for line breaks
        } else {
            heroText.textContent = newContent;
        }
        heroText.classList.add('visible');
    }, 300);
};

// Initialize tab click handlers
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        handleTabChange(item);
    });
});

// Safari video autoplay handling
const initVideo = () => {
    const heroVideo = document.querySelector('#heroVideo');
    const heroStaticMedia = document.querySelector('.static-media');
    const heroPlayButton = document.querySelector('.play-button');
    const heroHeader = document.querySelector('header');

    if (!heroVideo || !heroStaticMedia || !heroPlayButton || !heroHeader) return;

    let isVideoLoaded = false;
    let playAttemptInProgress = false;

    const useHeroStaticImage = () => {
        heroVideo.classList.remove('can-play');
        heroStaticMedia.classList.add('active');
        
        // Add header visibility after a delay
        setTimeout(() => {
            document.body.classList.add('fade-in-ready');
            heroHeader.classList.add('visible');
        }, 500);
        
        // Show play button
        setTimeout(() => {
            heroPlayButton.classList.add('visible');
            setTimeout(() => {
                heroPlayButton.classList.add('expanded');
            }, 300);
        }, 1000);
    };

    async function startHeroVideo() {
        if (playAttemptInProgress) return;
        playAttemptInProgress = true;

        try {
            heroPlayButton.classList.remove('visible', 'expanded');
            heroStaticMedia.classList.remove('active');
            heroVideo.classList.add('can-play');
            heroVideo.currentTime = 0;

            // Ensure video is loaded
            if (!isVideoLoaded) {
                await new Promise((resolve, reject) => {
                    if (heroVideo.readyState >= 3) {
                        resolve();
                    } else {
                        heroVideo.addEventListener('canplay', resolve, { once: true });
                        heroVideo.addEventListener('error', reject, { once: true });
                        setTimeout(reject, 5000);
                    }
                });
            }
            
            await heroVideo.play();
            isVideoLoaded = true;
            
            // Setup header fade in
            const duration = heroVideo.duration;
            const fadeInTime = duration * 0.55;
            
            const checkTime = () => {
                if (heroVideo.currentTime >= fadeInTime) {
                    document.body.classList.add('fade-in-ready');
                    heroHeader.classList.add('visible');
                    heroVideo.removeEventListener('timeupdate', checkTime);
                }
            };
            
            heroVideo.addEventListener('timeupdate', checkTime);
            
        } catch (error) {
            console.error('Video playback failed:', error);
            useHeroStaticImage();
        } finally {
            playAttemptInProgress = false;
        }
    }

    // Add click handler to hero play button with debounce
    let playButtonTimeout;
    heroPlayButton.addEventListener('click', () => {
        if (playButtonTimeout) clearTimeout(playButtonTimeout);
        playButtonTimeout = setTimeout(startHeroVideo, 100);
    });

    // Initial video setup
    heroVideo.classList.add('can-play');
    heroStaticMedia.classList.remove('active');

    // Attempt to play video
    const initialPlayAttempt = heroVideo.play();
    if (initialPlayAttempt !== undefined) {
        initialPlayAttempt.then(() => {
            isVideoLoaded = true;
        }).catch(() => {
            useHeroStaticImage();
        });
    } else {
        useHeroStaticImage();
    }
};

// Run on both DOMContentLoaded and load events for Safari
['DOMContentLoaded', 'load'].forEach(event => {
    document.addEventListener(event, initVideo);
});

// Initialize mobile menu
// document.addEventListener('DOMContentLoaded', initMobileMenu);
// Also initialize immediately in case DOM is already loaded
// initMobileMenu();

// Add this function to handle navigation clicks
const handleNavigationClick = () => {
    // Remove menu-active class from body
    document.body.classList.remove('menu-active');
    // Remove active class from mobile nav
    document.querySelector('.mobile-nav')?.classList.remove('active');
    // Remove active class from menu overlay
    document.querySelector('.menu-overlay')?.classList.remove('active');
    // Remove active class from hamburger
    document.querySelector('.hamburger-menu')?.classList.remove('active');
};

// Add click event listeners to only the direct navigation links and project items
document.querySelectorAll('.mobile-nav > .nav-link, .mobile-nav .project-item').forEach(link => {
    link.addEventListener('click', handleNavigationClick);
});

// Update the projects toggle functionality
const projectsToggle = document.querySelector('.mobile-nav .projects-toggle');
const projectsDropdown = document.querySelector('.mobile-nav .projects-dropdown');

if (projectsToggle && projectsDropdown) {
    projectsToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        projectsDropdown.classList.toggle('active');
    });
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.projects-section')) {
        projectsDropdown?.classList.remove('active');
    }
});

// Hamburger Menu - New Implementation
const hamburgerInit = () => {
    // Get all required elements
    const hamburger = document.querySelector('.hamburger-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    const overlay = document.querySelector('.menu-overlay');
    const projectsToggle = document.querySelector('.mobile-nav .projects-toggle');
    const projectsDropdown = document.querySelector('.mobile-nav .projects-dropdown');

    // Only proceed if we have the essential elements
    if (!hamburger || !mobileNav || !overlay) return;

    // Toggle mobile menu
    const toggleMobileMenu = () => {
        hamburger.classList.toggle('active');
        mobileNav.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.toggle('menu-active');
        
        // Only prevent scroll when menu is open
        if (mobileNav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    // Close mobile menu
    const closeMobileMenu = () => {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('menu-active');
        document.body.style.overflow = '';
    };

    // Event Listeners
    hamburger.addEventListener('click', (e) => {
        e.preventDefault();
        toggleMobileMenu();
    });

    overlay.addEventListener('click', closeMobileMenu);

    // Handle projects toggle if it exists
    if (projectsToggle && projectsDropdown) {
        projectsToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            projectsToggle.classList.toggle('active');
            projectsDropdown.classList.toggle('active');
        });
    }

    // Close menu when clicking links
    const navLinks = mobileNav.querySelectorAll('a:not(.projects-toggle)');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hamburgerInit);
} else {
    hamburgerInit();
}

// Initialize all navigation functionality
const initNavigation = () => {
    // Projects dropdown functionality
    const projectsToggle = document.querySelector('.projects-toggle');
    const projectsDropdown = document.querySelector('.projects-dropdown');

    if (projectsToggle && projectsDropdown) {
        projectsToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            projectsDropdown.classList.toggle('active');
            projectsToggle.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.projects-section')) {
                projectsDropdown.classList.remove('active');
                projectsToggle.classList.remove('active');
            }
        });
    }

    // Side navigation functionality
    const sideNavItems = document.querySelectorAll('.nav-item');
    const heroText = document.querySelector('.hero-text');
    
    if (sideNavItems.length && heroText) {
        sideNavItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                // Remove active class from all items
                sideNavItems.forEach(i => i.classList.remove('active'));
                // Add active class to clicked item
                item.classList.add('active');
                // Update the content based on the clicked item
                if (tabContents[item.textContent]) {
                    heroText.textContent = tabContents[item.textContent];
                }
            });
        });
    }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initNavigation();
        document.body.classList.add('loaded');
    });
} else {
    initNavigation();
    document.body.classList.add('loaded');
}

// Polygon Section Slideshow
const initPolygonSlideshow = () => {
    const slides = document.querySelectorAll('.polygon-section .slide');
    const prevButton = document.querySelector('.polygon-section .slide-arrow.prev');
    const nextButton = document.querySelector('.polygon-section .slide-arrow.next');
    const indicators = document.querySelectorAll('.polygon-section .indicator');
    const slideTexts = document.querySelectorAll('.polygon-section .slide-text');
    let currentSlide = 1;
    const totalSlides = slides.length;

    // Function to update slide visibility and indicators
    const updateSlide = (newSlide) => {
        // Remove active class from current slide
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        slideTexts.forEach(text => text.style.display = 'none');

        // Add active class to new slide
        slides[newSlide - 1].classList.add('active');
        indicators[newSlide - 1].classList.add('active');
        slideTexts[newSlide - 1].style.display = 'block';
        
        // Pause all videos
        const videos = document.querySelectorAll('.polygon-section video');
        videos.forEach(video => {
                video.pause();
                video.currentTime = 0;
        });

        // Play video of active slide if it exists
        const activeVideo = slides[newSlide - 1].querySelector('video');
        if (activeVideo) {
            activeVideo.play().catch(err => console.log('Video play error:', err));
    }

        currentSlide = newSlide;
    };

    // Previous slide
    prevButton?.addEventListener('click', () => {
        const newSlide = currentSlide === 1 ? totalSlides : currentSlide - 1;
        updateSlide(newSlide);
    });
    
    // Next slide
    nextButton?.addEventListener('click', () => {
        const newSlide = currentSlide === totalSlides ? 1 : currentSlide + 1;
        updateSlide(newSlide);
    });

    // Click on indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            updateSlide(index + 1);
        });
    });

    // Swipe functionality
    let touchStartX = 0;
    let touchEndX = 0;
    const slideContainer = document.querySelector('.polygon-section .slides-container');
    
    slideContainer?.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    }, false);

    slideContainer?.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    }, false);

    const handleSwipe = () => {
        const swipeThreshold = 50;
        const swipeLength = touchEndX - touchStartX;
        
        if (Math.abs(swipeLength) > swipeThreshold) {
            if (swipeLength > 0) {
                // Swiped right - go to previous
                const newSlide = currentSlide === 1 ? totalSlides : currentSlide - 1;
                updateSlide(newSlide);
            } else {
                // Swiped left - go to next
                const newSlide = currentSlide === totalSlides ? 1 : currentSlide + 1;
                updateSlide(newSlide);
        }
}
    };
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPolygonSlideshow);
} else {
    initPolygonSlideshow();
} 