// main.js
// KAC - Kerala Anime Community JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initAnimations();
    initSurveyForm();
    initNewsletterForm();
    initScrollToTop();
    initImagePlaceholders();
});

// Navigation functionality
function initNavigation() {
    const header = document.querySelector('.header');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');
    const dropdowns = document.querySelectorAll('.dropdown');

    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            navList.classList.toggle('active');
            document.body.style.overflow = navList.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close mobile menu when clicking on links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                mobileMenuToggle.classList.remove('active');
                navList.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Dropdown menu functionality for touch devices
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');
        
        if (window.innerWidth <= 768) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                dropdown.classList.toggle('active');
            });
        }
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
}

// Scroll effects and animations
function initScrollEffects() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

    function highlightNavLink() {
        let scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);
}

// Animation on scroll
function initAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Stagger animation for grid items
                if (entry.target.classList.contains('activity-card') || 
                    entry.target.classList.contains('support-item')) {
                    const delay = Array.from(entry.target.parentElement.children).indexOf(entry.target) * 100;
                    entry.target.style.transitionDelay = `${delay}ms`;
                }
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Add fade-in class to elements that should animate
    const elementsToAnimate = [
        '.hero-content',
        '.about-content > *',
        '.activity-card',
        '.support-item',
        '.survey-container'
    ];

    elementsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.classList.add('fade-in');
        });
    });
}

// Survey form functionality
function initSurveyForm() {
    const surveyBtn = document.querySelector('.survey-section .btn-primary');
    
    if (surveyBtn) {
        surveyBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Create a modal for survey
            const modal = document.createElement('div');
            modal.className = 'survey-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <h2>Community Improvement Survey</h2>
                    <p>Thank you for your interest in helping us improve! Our survey is currently being prepared.</p>
                    <p>We'll notify you when it's ready. In the meantime, you can join our community to stay updated!</p>
                    <div class="modal-buttons">
                        <a href="/join" class="btn btn-primary">Join Community</a>
                        <button class="btn btn-secondary close-btn">Close</button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            document.body.style.overflow = 'hidden';
            
            // Add modal styles
            const style = document.createElement('style');
            style.textContent = `
                .survey-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.8);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 2000;
                    animation: fadeIn 0.3s ease;
                }
                
                .modal-content {
                    background: white;
                    padding: 40px;
                    border-radius: 12px;
                    max-width: 500px;
                    width: 90%;
                    position: relative;
                    animation: slideUp 0.3s ease;
                }
                
                .close-modal {
                    position: absolute;
                    top: 15px;
                    right: 20px;
                    font-size: 24px;
                    cursor: pointer;
                    color: var(--text-light);
                }
                
                .close-modal:hover {
                    color: var(--text-dark);
                }
                
                .modal-content h2 {
                    color: var(--primary-color);
                    margin-bottom: 15px;
                }
                
                .modal-content p {
                    margin-bottom: 15px;
                    color: var(--text-light);
                }
                
                .modal-buttons {
                    display: flex;
                    gap: 15px;
                    margin-top: 25px;
                    flex-wrap: wrap;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes slideUp {
                    from { 
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to { 
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `;
            document.head.appendChild(style);
            
            // Close modal functionality
            const closeModal = () => {
                modal.remove();
                style.remove();
                document.body.style.overflow = '';
            };
            
            modal.querySelector('.close-modal').addEventListener('click', closeModal);
            modal.querySelector('.close-btn').addEventListener('click', closeModal);
            modal.addEventListener('click', (e) => {
                if (e.target === modal) closeModal();
            });
        });
    }
}

// Newsletter form functionality
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                // Simulate form submission
                const submitBtn = newsletterForm.querySelector('button');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Subscribing...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    showNotification('Successfully subscribed to our newsletter!', 'success');
                    emailInput.value = '';
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            } else {
                showNotification('Please enter a valid email address.', 'error');
            }
        });
    }
}

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add notification styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 30px;
                padding: 15px 25px;
                border-radius: 8px;
                color: white;
                font-weight: 500;
                z-index: 3000;
                animation: slideInRight 0.3s ease, slideOutRight 0.3s ease 2.7s forwards;
                max-width: 400px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            }
            
            .notification.success {
                background: #4CAF50;
            }
            
            .notification.error {
                background: #f44336;
            }
            
            .notification.info {
                background: var(--primary-color);
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after animation
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 3000);
}

// Scroll to top functionality
function initScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    
    document.body.appendChild(scrollBtn);
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
}

// Image placeholder functionality
function initImagePlaceholders() {
    // Handle missing images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Replace broken images with placeholder
            if (this.classList.contains('logo')) {
                this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iOCIgZmlsbD0iIzZBMERBRCIvPgo8cGF0aCBkPSJNMTAgMTVIMzBWMTguNUgyNVYyNUgyMS41VjE4LjVIMTVWMjVIMTEuNVYxOC41SDEwVjE1WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+';
            } else {
                this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiByeD0iMTIiIGZpbGw9IiNGMEYyRjQiLz4KPHBhdGggZD0iTTE1MCAxMjBIMjUwVjE4MEgxNTBWMTIwWiIgZmlsbD0iI0UxRTRFOCIvPgo8Y2lyY2xlIGN4PSIyMDAiIGN5PSIyNDAiIHI9IjMwIiBmaWxsPSIjRTFFNEU4Ii8+Cjwvc3ZnPgo=';
            }
            this.alt = 'Image placeholder';
        });
    });
}

// Utility function for debouncing
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Page load animations
window.addEventListener('load', () => {
    // Add loaded class to body for any post-load animations
    document.body.classList.add('loaded');
    
    // Initialize any lazy loading if needed
    const lazyImages = document.querySelectorAll('img[data-src]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }
});

// Keyboard navigation enhancement
document.addEventListener('keydown', (e) => {
    // Escape key closes modals/dropdowns
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.survey-modal');
        modals.forEach(modal => modal.remove());
        
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
        
        const mobileMenu = document.querySelector('.nav-list');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// Performance optimization - lazy load non-critical resources
function loadExternalResources() {
    // Load any additional fonts or non-critical CSS
    const criticalResourcesLoaded = performance.now();
    console.log(`Critical resources loaded in ${criticalResourcesLoaded}ms`);
}

// Export functions for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateEmail,
        debounce,
        showNotification
    };
}
