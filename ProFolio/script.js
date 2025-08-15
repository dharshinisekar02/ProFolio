/**
 * Ultra Klensing Cleaning Services - Main JavaScript File
 * Handles interactive functionality across the website
 */

(function() {
    'use strict';

    // Initialize when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        initializeFeatherIcons();
        initializeNavigation();
        initializeFormValidation();
        initializeGalleryFilters();
        initializeScrollEffects();
        initializeSmoothScrolling();
        initializeLoadMoreGallery();
        initializeURLParams();
        initializeAccessibility();
    });

    /**
     * Initialize Feather Icons
     */
    function initializeFeatherIcons() {
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }

    /**
     * Initialize Navigation Functionality
     */
    function initializeNavigation() {
        const header = document.getElementById('header');
        const menuToggle = document.getElementById('menu-toggle');
        
        // Sticky header on scroll
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            lastScrollTop = scrollTop;
        });

        // Close mobile menu when clicking on nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                if (menuToggle) {
                    menuToggle.checked = false;
                }
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const nav = document.querySelector('.nav');
            const burgerMenu = document.querySelector('.burger-menu');
            
            if (menuToggle && menuToggle.checked && 
                !nav.contains(event.target) && 
                !burgerMenu.contains(event.target)) {
                menuToggle.checked = false;
            }
        });

        // Set active navigation link based on current page
        setActiveNavLink();
    }

    /**
     * Set active navigation link based on current page
     */
    function setActiveNavLink() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(function(link) {
            link.classList.remove('active');
            
            const href = link.getAttribute('href');
            if (href === currentPath || 
                (currentPath === '/' && href === 'index.html') ||
                (currentPath === '/index.html' && href === 'index.html')) {
                link.classList.add('active');
            }
        });
    }

    /**
     * Initialize Form Validation
     */
    function initializeFormValidation() {
        const contactForm = document.querySelector('.contact-form');
        
        if (!contactForm) return;

        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(function(input) {
            input.addEventListener('blur', function() {
                validateField(input);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(input);
            });
        });

        // Form submission
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            if (validateForm(contactForm)) {
                submitForm(contactForm);
            }
        });
    }

    /**
     * Validate individual form field
     */
    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        const errorElement = document.getElementById(fieldName + '-error');
        
        let isValid = true;
        let errorMessage = '';

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required.';
        }
        
        // Email validation
        else if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address.';
            }
        }
        
        // Phone validation
        else if (field.type === 'tel' && value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number.';
            }
        }

        // Display validation result
        if (errorElement) {
            if (isValid) {
                errorElement.textContent = '';
                field.classList.remove('error');
            } else {
                errorElement.textContent = errorMessage;
                field.classList.add('error');
            }
        }

        return isValid;
    }

    /**
     * Clear field error styling
     */
    function clearFieldError(field) {
        const errorElement = document.getElementById(field.name + '-error');
        if (errorElement && field.classList.contains('error')) {
            field.classList.remove('error');
            errorElement.textContent = '';
        }
    }

    /**
     * Validate entire form
     */
    function validateForm(form) {
        const requiredFields = form.querySelectorAll('[required]');
        let isFormValid = true;

        requiredFields.forEach(function(field) {
            if (!validateField(field)) {
                isFormValid = false;
            }
        });

        return isFormValid;
    }

    /**
     * Submit form (placeholder functionality)
     */
    function submitForm(form) {
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Show loading state
        submitButton.classList.add('loading');
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        // Simulate form submission (replace with actual submission logic)
        setTimeout(function() {
            // Reset button state
            submitButton.classList.remove('loading');
            submitButton.textContent = originalText;
            submitButton.disabled = false;

            // Show success message
            showNotification('Thank you! Your message has been sent. We\'ll get back to you within 24 hours.', 'success');
            
            // Reset form
            form.reset();
        }, 2000);
    }

    /**
     * Show notification message
     */
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close" aria-label="Close notification">&times;</button>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? 'var(--success-color)' : 'var(--primary-color)'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: var(--radius-md);
            box-shadow: var(--shadow-lg);
            z-index: 1001;
            max-width: 400px;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto-hide after 5 seconds
        setTimeout(() => {
            hideNotification(notification);
        }, 5000);

        // Close button functionality
        const closeButton = notification.querySelector('.notification-close');
        closeButton.addEventListener('click', () => {
            hideNotification(notification);
        });
    }

    /**
     * Hide notification
     */
    function hideNotification(notification) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    /**
     * Initialize Gallery Filters
     */
    function initializeGalleryFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const galleryItems = document.querySelectorAll('.gallery-item');

        if (!filterButtons.length || !galleryItems.length) return;

        filterButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                // Filter gallery items
                galleryItems.forEach(function(item) {
                    const categories = item.getAttribute('data-category');
                    
                    if (filter === 'all' || categories.includes(filter)) {
                        item.style.display = 'block';
                        item.style.animation = 'fadeIn 0.5s ease';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    /**
     * Initialize scroll effects
     */
    function initializeScrollEffects() {
        // Intersection Observer for fade-in animations
        if ('IntersectionObserver' in window) {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, observerOptions);

            // Observe elements that should animate on scroll
            const animateElements = document.querySelectorAll(
                '.why-card, .service-card, .testimonial-card, .pricing-card, .gallery-item, .team-member'
            );
            
            animateElements.forEach(function(element) {
                element.classList.add('animate-on-scroll');
                observer.observe(element);
            });
        }

        // Add CSS for scroll animations
        addScrollAnimationStyles();
    }

    /**
     * Add CSS for scroll animations
     */
    function addScrollAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .animate-on-scroll {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            
            .animate-on-scroll.visible {
                opacity: 1;
                transform: translateY(0);
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Initialize smooth scrolling for anchor links
     */
    function initializeSmoothScrolling() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(function(link) {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    /**
     * Initialize "Load More" functionality for gallery
     */
    function initializeLoadMoreGallery() {
        const loadMoreBtn = document.getElementById('load-more-btn');
        
        if (!loadMoreBtn) return;

        let itemsToShow = 12;
        const allItems = document.querySelectorAll('.gallery-item');
        
        // Initially hide items beyond the limit
        if (allItems.length > itemsToShow) {
            for (let i = itemsToShow; i < allItems.length; i++) {
                allItems[i].style.display = 'none';
            }
        } else {
            loadMoreBtn.style.display = 'none';
        }

        loadMoreBtn.addEventListener('click', function() {
            const hiddenItems = document.querySelectorAll('.gallery-item[style*="display: none"]');
            const itemsToLoad = Math.min(6, hiddenItems.length);
            
            for (let i = 0; i < itemsToLoad; i++) {
                hiddenItems[i].style.display = 'block';
                hiddenItems[i].style.animation = 'fadeIn 0.5s ease';
            }
            
            // Hide button if no more items
            if (document.querySelectorAll('.gallery-item[style*="display: none"]').length === 0) {
                this.style.display = 'none';
            }
        });
    }

    /**
     * Initialize URL parameter handling
     */
    function initializeURLParams() {
        const urlParams = new URLSearchParams(window.location.search);
        
        // Pre-fill form based on URL parameters
        const serviceParam = urlParams.get('service');
        const planParam = urlParams.get('plan');
        
        if (serviceParam) {
            const serviceSelect = document.getElementById('serviceType');
            if (serviceSelect) {
                // Map URL parameters to form values
                const serviceMap = {
                    'hospital': 'medical',
                    'residential': 'residential',
                    'office': 'commercial',
                    'move-cleaning': 'move-clean',
                    'floor-care': 'floor-care',
                    'disinfection': 'disinfection',
                    'assessment': 'other'
                };
                
                const mappedService = serviceMap[serviceParam] || serviceParam;
                serviceSelect.value = mappedService;
            }
        }
        
        if (planParam) {
            const messageField = document.getElementById('message');
            if (messageField && !messageField.value) {
                messageField.value = `I'm interested in the ${planParam} pricing plan. Please provide more information.`;
            }
        }
    }

    /**
     * Initialize accessibility enhancements
     */
    function initializeAccessibility() {
        // Add keyboard navigation for mobile menu
        const menuToggle = document.getElementById('menu-toggle');
        const burgerMenu = document.querySelector('.burger-menu');
        
        if (burgerMenu) {
            burgerMenu.addEventListener('keydown', function(event) {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    menuToggle.checked = !menuToggle.checked;
                }
            });
        }

        // Enhance focus management for modals/dropdowns
        document.addEventListener('keydown', function(event) {
            // Close mobile menu with Escape key
            if (event.key === 'Escape' && menuToggle && menuToggle.checked) {
                menuToggle.checked = false;
            }
        });

        // Add skip link functionality
        const skipLink = document.querySelector('.skip-link');
        if (skipLink) {
            skipLink.addEventListener('click', function(event) {
                event.preventDefault();
                const target = document.getElementById('main-content');
                if (target) {
                    target.focus();
                    target.scrollIntoView();
                }
            });
        }

        // Improve form accessibility
        const forms = document.querySelectorAll('form');
        forms.forEach(function(form) {
            const inputs = form.querySelectorAll('input, select, textarea');
            inputs.forEach(function(input) {
                // Add aria-invalid for validation states
                input.addEventListener('invalid', function() {
                    this.setAttribute('aria-invalid', 'true');
                });
                
                input.addEventListener('input', function() {
                    if (this.checkValidity()) {
                        this.removeAttribute('aria-invalid');
                    }
                });
            });
        });
    }

    /**
     * Utility function to debounce function calls
     */
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

    /**
     * Initialize performance optimizations
     */
    function initializePerformanceOptimizations() {
        // Lazy load images when they're about to enter viewport
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
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

            const lazyImages = document.querySelectorAll('img[data-src]');
            lazyImages.forEach(img => imageObserver.observe(img));
        }

        // Preload critical resources
        const criticalResources = [
            'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap',
            'https://unpkg.com/feather-icons'
        ];

        criticalResources.forEach(function(resource) {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource;
            link.as = resource.includes('fonts') ? 'style' : 'script';
            document.head.appendChild(link);
        });
    }

    // Initialize performance optimizations
    initializePerformanceOptimizations();

    // Export functions for testing (if needed)
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = {
            validateField,
            validateForm,
            showNotification
        };
    }

})();
