// Premium JavaScript with GSAP animations and advanced interactions
gsap.registerPlugin(ScrollTrigger);

// Global variables
let cursor, cursorFollower;
let isMenuOpen = false;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initCursor();
    initNavigation();
    initAnimations();
    initScrollEffects();
    initFormHandling();
    initTypingAnimation();
    initParallaxElements();
    initIntersectionObserver();
    initPerformanceOptimizations();
});

// Custom Cursor
function initCursor() {
    cursor = document.querySelector('.cursor');
    cursorFollower = document.querySelector('.cursor-follower');
    
    if (!cursor || !cursorFollower) return;
    
    // Only show cursor on desktop
    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: "power2.out"
            });
            
            gsap.to(cursorFollower, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        // Cursor interactions
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .service-card, .nav-link');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                gsap.to(cursor, { scale: 1.5, duration: 0.2 });
                gsap.to(cursorFollower, { scale: 1.5, duration: 0.3 });
            });
            
            element.addEventListener('mouseleave', () => {
                gsap.to(cursor, { scale: 1, duration: 0.2 });
                gsap.to(cursorFollower, { scale: 1, duration: 0.3 });
            });
        });
    } else {
        cursor.style.display = 'none';
        cursorFollower.style.display = 'none';
    }
}

// Enhanced Navigation
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    if (mobileMenu) {
        mobileMenu.addEventListener('click', toggleMobileMenu);
    }
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    gsap.to(window, {
                        duration: 1.2,
                        scrollTo: {
                            y: target,
                            offsetY: 80
                        },
                        ease: "power2.inOut"
                    });
                    
                    if (isMenuOpen) {
                        toggleMobileMenu();
                    }
                }
            }
        });
    });
    
    // Navbar scroll effects
    let lastScrollY = 0;
    let ticking = false;
    
    function updateNavbar() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            gsap.to(navbar, {
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                duration: 0.3
            });
        } else {
            gsap.to(navbar, {
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                duration: 0.3
            });
        }
        
        // Hide/show navbar based on scroll direction
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            gsap.to(navbar, { y: -100, duration: 0.3 });
        } else {
            gsap.to(navbar, { y: 0, duration: 0.3 });
        }
        
        lastScrollY = currentScrollY;
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });
    
    // Active section highlighting
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-80px 0px -50% 0px'
    };
    
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => navObserver.observe(section));
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const hamburgerLines = mobileMenu.querySelectorAll('.hamburger-line');
    
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
        navMenu.classList.add('active');
        gsap.to(hamburgerLines[0], { rotation: 45, y: 6, duration: 0.3 });
        gsap.to(hamburgerLines[1], { opacity: 0, duration: 0.3 });
        gsap.to(hamburgerLines[2], { rotation: -45, y: -6, duration: 0.3 });
        
        // Animate menu items
        const menuItems = navMenu.querySelectorAll('.nav-item');
        gsap.fromTo(menuItems, 
            { y: -20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.3, stagger: 0.1, delay: 0.1 }
        );
    } else {
        navMenu.classList.remove('active');
        gsap.to(hamburgerLines, { rotation: 0, y: 0, opacity: 1, duration: 0.3 });
    }
}

// Advanced Animations
function initAnimations() {
    // Hero section animations
    const heroTimeline = gsap.timeline();
    
    heroTimeline
        .from('.hero-badge', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        })
        .from('.hero-title .title-line', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out"
        }, "-=0.4")
        .from('.hero-description', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.4")
        .from('.stat-item', {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out"
        }, "-=0.4")
        .from('.hero-actions .btn', {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out"
        }, "-=0.4")
        .from('.hero-visual', {
            x: 50,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        }, "-=0.8");
    
    // Floating elements animation
    gsap.to('.float-element', {
        y: -20,
        duration: 3,
        ease: "sine.inOut",
        stagger: 0.5,
        repeat: -1,
        yoyo: true
    });
    
    // Code snippet typing effect
    setTimeout(() => {
        animateCodeSnippet();
    }, 2000);
}

function animateCodeSnippet() {
    const codeLines = document.querySelectorAll('.code-line');
    if (codeLines.length === 0) return;
    
    // Hide all lines initially
    gsap.set(codeLines, { opacity: 0 });
    
    // Animate lines appearing one by one
    codeLines.forEach((line, index) => {
        gsap.to(line, {
            opacity: 1,
            duration: 0.5,
            delay: index * 0.3,
            ease: "power2.out"
        });
    });
}

// Scroll-triggered animations
function initScrollEffects() {
    // About section
    gsap.fromTo('.about-text p', 
        { y: 50, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
                trigger: '.about-text',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        }
    );
    
    gsap.fromTo('.highlight-item', 
        { x: -50, opacity: 0 },
        {
            x: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
                trigger: '.about-highlights',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        }
    );
    
    // Skills animation
    gsap.fromTo('.tech-item', 
        { scale: 0, opacity: 0 },
        {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            stagger: 0.05,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: '.skills-container',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        }
    );
    
    // Timeline animation
    gsap.fromTo('.timeline-item', 
        { x: -100, opacity: 0 },
        {
            x: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.3,
            scrollTrigger: {
                trigger: '.experience-timeline',
                start: 'top 70%',
                end: 'bottom 30%',
                toggleActions: 'play none none reverse'
            }
        }
    );
    
    // Portfolio cards
    gsap.fromTo('.project-card', 
        { y: 100, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.portfolio-grid',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        }
    );
    
    // Contact section
    gsap.fromTo('.contact-method', 
        { x: -50, opacity: 0 },
        {
            x: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            scrollTrigger: {
                trigger: '.contact-methods',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        }
    );
}

// Parallax effects
function initParallaxElements() {
    gsap.to('.hero-background', {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
            trigger: '.hero',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });
    
    gsap.to('.float-element', {
        y: -100,
        ease: "none",
        scrollTrigger: {
            trigger: '.hero',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });
}

// Enhanced typing animation
function initTypingAnimation() {
    const heroTitle = document.querySelector('.hero-title .gradient-text');
    if (!heroTitle) return;
    
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let index = 0;
    const typingSpeed = 100;
    
    function typeCharacter() {
        if (index < text.length) {
            heroTitle.textContent += text.charAt(index);
            index++;
            setTimeout(typeCharacter, typingSpeed);
        } else {
            // Add blinking cursor effect
            heroTitle.style.borderRight = '2px solid var(--color-primary)';
            setTimeout(() => {
                heroTitle.style.borderRight = 'none';
            }, 2000);
        }
    }
    
    setTimeout(typeCharacter, 1500);
}

// Form handling with validation
function initFormHandling() {
    const form = document.querySelector('.modern-form');
    if (!form) return;
    
    form.addEventListener('submit', handleFormSubmit);
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearErrors);
    });
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Remove existing error messages
    clearFieldError(field);
    
    // Validation rules
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    if (field.type === 'email' && value && !isValidEmail(value)) {
        showFieldError(field, 'Please enter a valid email address');
        return false;
    }
    
    return true;
}

function clearErrors(e) {
    clearFieldError(e.target);
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    field.style.borderColor = 'var(--color-error)';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.cssText = `
        color: var(--color-error);
        font-size: var(--text-sm);
        margin-top: var(--space-1);
    `;
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
    field.style.borderColor = 'var(--color-gray-200)';
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const inputs = form.querySelectorAll('input, select, textarea');
    let isValid = true;
    
    // Validate all fields
    inputs.forEach(input => {
        if (!validateField({ target: input })) {
            isValid = false;
        }
    });
    
    if (!isValid) return;
    
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    submitButton.innerHTML = `
        <span>Sending...</span>
        <i class="fas fa-spinner fa-spin"></i>
    `;
    submitButton.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        showSuccessMessage();
        form.reset();
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }, 2000);
}

function showSuccessMessage() {
    const message = document.createElement('div');
    message.className = 'success-message';
    message.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--color-success);
        color: white;
        padding: var(--space-4) var(--space-6);
        border-radius: var(--border-radius-lg);
        box-shadow: var(--shadow-lg);
        z-index: 9999;
        transform: translateX(100%);
        opacity: 0;
    `;
    message.innerHTML = `
        <div style="display: flex; align-items: center; gap: var(--space-2);">
            <i class="fas fa-check-circle"></i>
            <span>Message sent successfully! I'll get back to you soon.</span>
        </div>
    `;
    
    document.body.appendChild(message);
    
    // Animate in
    gsap.to(message, {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: "back.out(1.7)"
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        gsap.to(message, {
            x: "100%",
            opacity: 0,
            duration: 0.5,
            ease: "power2.in",
            onComplete: () => message.remove()
        });
    }, 5000);
}

// Intersection Observer for performance
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '50px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserver(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate on scroll
    const observeElements = document.querySelectorAll(
        '.section-header, .service-card, .project-card, .timeline-item'
    );
    
    observeElements.forEach(el => observer.observe(el));
}

// Performance optimizations
function initPerformanceOptimizations() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Preload critical resources
    const criticalResources = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
    ];
    
    criticalResources.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        document.head.appendChild(link);
    });
    
    // Service Worker for caching (if supported)
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch(err => {
            console.log('Service Worker registration failed:', err);
        });
    }
}

// Utility functions
function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    return function (...args) {
        const currentTime = Date.now();
        
        if (currentTime - lastExecTime > delay) {
            func.apply(this, args);
            lastExecTime = currentTime;
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
                lastExecTime = Date.now();
            }, delay - (currentTime - lastExecTime));
        }
    };
}

function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Enhanced scroll to top
function createScrollToTop() {
    const button = document.createElement('button');
    button.className = 'scroll-to-top';
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--color-primary);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: var(--shadow-lg);
        transition: all var(--transition-base);
        opacity: 0;
        transform: translateY(100px);
        z-index: 1000;
    `;
    
    button.addEventListener('click', () => {
        gsap.to(window, {
            duration: 1.5,
            scrollTo: { y: 0 },
            ease: "power2.inOut"
        });
    });
    
    document.body.appendChild(button);
    
    // Show/hide based on scroll position
    const toggleButton = throttle(() => {
        if (window.scrollY > 500) {
            gsap.to(button, {
                opacity: 1,
                y: 0,
                duration: 0.3,
                ease: "back.out(1.7)"
            });
        } else {
            gsap.to(button, {
                opacity: 0,
                y: 100,
                duration: 0.3
            });
        }
    }, 100);
    
    window.addEventListener('scroll', toggleButton);
}

// Initialize scroll to top button
createScrollToTop();

// Handle resize events
window.addEventListener('resize', debounce(() => {
    // Recalculate animations on resize
    ScrollTrigger.refresh();
    
    // Update cursor visibility
    if (window.innerWidth <= 768) {
        if (cursor) cursor.style.display = 'none';
        if (cursorFollower) cursorFollower.style.display = 'none';
    } else {
        if (cursor) cursor.style.display = 'block';
        if (cursorFollower) cursorFollower.style.display = 'block';
    }
}, 250));

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is hidden
        gsap.globalTimeline.pause();
    } else {
        // Resume animations when page is visible
        gsap.globalTimeline.resume();
    }
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.timing;
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`Page load time: ${loadTime}ms`);
        }, 0);
    });
}

console.log('Premium portfolio website loaded successfully! 🚀');