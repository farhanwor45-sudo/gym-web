// ================================
// IRONFORGE FITNESS - JavaScript
// ================================

// === Smooth Scroll & Navigation ===
document.addEventListener('DOMContentLoaded', function() {
    
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    // Sticky navbar on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Parallax effect for hero
        const hero = document.querySelector('.hero-bg');
        if (hero) {
            const scrolled = window.scrollY;
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    });
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
            
            // Smooth scroll to section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    });
    
    // === Scroll Animations ===
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for multiple elements
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.about-text, .about-image, .stat-card, .program-card, ' +
        '.trainer-card, .pricing-card, .facility-card, .testimonial-card'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // === Animated Counter for Stats ===
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;
    
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                statNumbers.forEach(statNumber => {
                    animateCounter(statNumber);
                });
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.stats-grid');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
    
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };
        
        updateCounter();
    }
    
    // === CTA Buttons ===
    const ctaButtons = document.querySelectorAll(
        '.nav-cta, .btn-primary, .pricing-btn, .program-btn'
    );
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Scroll to membership section for pricing-related buttons
            if (this.classList.contains('pricing-btn') || 
                this.classList.contains('nav-cta') ||
                this.textContent.includes('Join')) {
                e.preventDefault();
                const membershipSection = document.querySelector('#membership');
                if (membershipSection) {
                    const offsetTop = membershipSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
                
                // Add ripple effect
                createRipple(e, this);
            }
            
            // Scroll to programs for program buttons
            if (this.classList.contains('program-btn') || 
                (this.classList.contains('btn-secondary') && 
                 this.textContent.includes('Programs'))) {
                e.preventDefault();
                const programsSection = document.querySelector('#programs');
                if (programsSection) {
                    const offsetTop = programsSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
                
                createRipple(e, this);
            }
            
            // Start Training button scrolls to about
            if (this.classList.contains('btn-primary') && 
                this.textContent.includes('Start Training')) {
                e.preventDefault();
                const aboutSection = document.querySelector('#about');
                if (aboutSection) {
                    const offsetTop = aboutSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
                
                createRipple(e, this);
            }
        });
    });
    
    // Ripple effect function
    function createRipple(event, button) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // Add ripple animation to CSS dynamically
    if (!document.querySelector('#ripple-animation')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // === Facility Gallery Lightbox ===
    const facilityCards = document.querySelectorAll('.facility-card');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('img');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    
    facilityCards.forEach(card => {
        card.addEventListener('click', function() {
            const facilityImage = this.querySelector('.facility-image');
            const facilityInfo = this.querySelector('.facility-info');
            const title = facilityInfo.querySelector('h3').textContent;
            const description = facilityInfo.querySelector('p').textContent;
            
            // Get background image URL
            const bgImage = window.getComputedStyle(facilityImage).backgroundImage;
            const imageUrl = bgImage.slice(5, -2); // Remove url(" and ")
            
            lightboxImg.src = imageUrl;
            lightboxCaption.textContent = `${title} - ${description}`;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close lightbox
    lightboxClose.addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // === Contact Form ===
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Basic validation
            if (!name || !email || !message) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            const submitButton = contactForm.querySelector('.form-submit');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                // Reset form
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                
                // Show success message
                showNotification('Thank you! We\'ll get back to you soon.', 'success');
                
                // Log form data (in production, this would be sent to a server)
                console.log('Form submitted:', { name, email, phone, subject, message });
            }, 1500);
        });
    }
    
    // Notification function
    function showNotification(message, type = 'success') {
        // Remove existing notification if any
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Notification styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 30px;
            padding: 20px 30px;
            background: ${type === 'success' ? '#4caf50' : '#f44336'};
            color: white;
            border-radius: 8px;
            font-size: 15px;
            font-weight: 500;
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        `;
        
        document.body.appendChild(notification);
        
        // Add slide in animation
        if (!document.querySelector('#notification-animation')) {
            const style = document.createElement('style');
            style.id = 'notification-animation';
            style.textContent = `
                @keyframes slideIn {
                    from {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                @keyframes slideOut {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Remove notification after 4 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 4000);
    }
    
    // === Schedule Table Interaction ===
    const scheduleRows = document.querySelectorAll('.schedule-row:not(.schedule-header)');
    
    scheduleRows.forEach(row => {
        row.addEventListener('click', function() {
            // Remove active class from all rows
            scheduleRows.forEach(r => r.style.background = '');
            
            // Add highlight to clicked row
            this.style.background = 'rgba(201, 169, 97, 0.1)';
            
            // Get class details
            const className = this.querySelector('.schedule-class').textContent;
            const trainer = this.querySelector('.schedule-trainer').textContent;
            const time = this.querySelector('.schedule-time').textContent;
            
            showNotification(`${className} with ${trainer} at ${time}`, 'success');
        });
    });
    
    // === Pricing Card Interaction ===
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            pricingCards.forEach(c => {
                if (c !== this && !c.classList.contains('featured')) {
                    c.style.opacity = '0.6';
                }
            });
        });
        
        card.addEventListener('mouseleave', function() {
            pricingCards.forEach(c => {
                c.style.opacity = '1';
            });
        });
    });
    
    // === Trainer Card Hover Effect ===
    const trainerCards = document.querySelectorAll('.trainer-card');
    
    trainerCards.forEach(card => {
        card.addEventListener('click', function() {
            const trainerName = this.querySelector('.trainer-info h3').textContent;
            const specialty = this.querySelector('.trainer-specialty').textContent;
            showNotification(`Connect with ${trainerName} - ${specialty}`, 'success');
        });
    });
    
    // === Program Card Interaction ===
    const programCards = document.querySelectorAll('.program-card');
    
    programCards.forEach(card => {
        const programBtn = card.querySelector('.program-btn');
        
        programBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const programName = card.querySelector('h3').textContent;
            const difficulty = card.querySelector('.difficulty').textContent;
            const duration = card.querySelector('.duration').textContent;
            
            showNotification(
                `${programName} - ${difficulty} - ${duration}`,
                'success'
            );
        });
    });
    
    // === Smooth Page Load Animation ===
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    });
    
    // === Mouse Move Parallax Effect ===
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });
    
    function animateParallax() {
        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;
        
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `translate(${targetX * 20}px, ${targetY * 20}px)`;
        }
        
        requestAnimationFrame(animateParallax);
    }
    
    animateParallax();
    
    // === Add 3D Tilt Effect to Cards ===
    const tiltCards = document.querySelectorAll('.program-card, .trainer-card, .pricing-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
    
    // === Scroll Progress Indicator ===
    const scrollProgress = document.createElement('div');
    scrollProgress.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #c9a961, #e0c080);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(scrollProgress);
    
    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    });
    
    // === Map Placeholder Click ===
    const mapPlaceholder = document.querySelector('.map-placeholder');
    if (mapPlaceholder) {
        mapPlaceholder.addEventListener('click', function() {
            // In production, this would open Google Maps
            const address = '2450 Industrial Blvd, Los Angeles, CA 90021';
            const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
            showNotification('Opening location in Google Maps...', 'success');
            
            // Simulate opening maps (in production, use window.open)
            console.log('Maps URL:', mapsUrl);
            
            setTimeout(() => {
                // window.open(mapsUrl, '_blank');
            }, 1000);
        });
    }
    
    // === Footer Links ===
    const footerLinks = document.querySelectorAll('.footer-col a');
    
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Check if it's an internal link (starts with #)
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // === Performance Optimization ===
    // Lazy loading for images (if using img tags)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // === Disable Right Click on Images (Optional - for portfolio protection) ===
    // Uncomment if you want to protect images
    /*
    document.querySelectorAll('.facility-image, .program-image, .trainer-image').forEach(img => {
        img.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            showNotification('Image protection enabled', 'error');
        });
    });
    */
    
    // === Console Welcome Message ===
    console.log('%c IRONFORGE FITNESS ', 'background: #c9a961; color: #0a0a0a; font-size: 20px; font-weight: bold; padding: 10px;');
    console.log('%c Premium Gym Website - Built with ♥ ', 'color: #c9a961; font-size: 14px;');
    
}); // End of DOMContentLoaded

// === Additional Utility Functions ===

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Smooth scroll to top button (if needed in future)
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Detect if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Format date (for potential future use)
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
}

// === Handle Browser Resize ===
let resizeTimer;
window.addEventListener('resize', function() {
    document.body.classList.add('resize-animation-stopper');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove('resize-animation-stopper');
    }, 400);
});

// Add CSS to stop animations during resize
const style = document.createElement('style');
style.textContent = `
    .resize-animation-stopper * {
        animation: none !important;
        transition: none !important;
    }
`;
document.head.appendChild(style);
