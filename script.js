// ============================================
// Navigation & Mobile Menu
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const contactForm = document.getElementById('contactForm');
    const currentYear = document.getElementById('currentYear');

    // Set current year in footer
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // ============================================
    // Hero Carousel (Home page)
    // ============================================
    const heroSection = document.querySelector('.hero');
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroPrev = document.querySelector('.hero-carousel-arrow-prev');
    const heroNext = document.querySelector('.hero-carousel-arrow-next');
    const heroDotsContainer = document.querySelector('.hero-carousel-dots');
    let heroCurrentIndex = 0;
    let heroIntervalId;

    if (heroSection && heroSlides.length > 0 && heroDotsContainer) {
        // Create dots based on slides
        heroSlides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'hero-carousel-dot' + (index === 0 ? ' active' : '');
            dot.type = 'button';
            dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
            dot.addEventListener('click', () => {
                goToHeroSlide(index);
                restartHeroInterval();
            });
            heroDotsContainer.appendChild(dot);
        });

        const heroDots = heroDotsContainer.querySelectorAll('.hero-carousel-dot');

        function goToHeroSlide(index) {
            heroSlides[heroCurrentIndex].classList.remove('active');
            heroDots[heroCurrentIndex].classList.remove('active');

            heroCurrentIndex = (index + heroSlides.length) % heroSlides.length;

            heroSlides[heroCurrentIndex].classList.add('active');
            heroDots[heroCurrentIndex].classList.add('active');
        }

        function nextHeroSlide() {
            goToHeroSlide(heroCurrentIndex + 1);
        }

        function prevHeroSlide() {
            goToHeroSlide(heroCurrentIndex - 1);
        }

        function startHeroInterval() {
            heroIntervalId = setInterval(nextHeroSlide, 5000);
        }

        function restartHeroInterval() {
            if (heroIntervalId) {
                clearInterval(heroIntervalId);
            }
            startHeroInterval();
        }

        if (heroNext) {
            heroNext.addEventListener('click', () => {
                nextHeroSlide();
                restartHeroInterval();
            });
        }

        if (heroPrev) {
            heroPrev.addEventListener('click', () => {
                prevHeroSlide();
                restartHeroInterval();
            });
        }

        heroSection.addEventListener('mouseenter', () => {
            if (heroIntervalId) {
                clearInterval(heroIntervalId);
            }
        });

        heroSection.addEventListener('mouseleave', () => {
            restartHeroInterval();
        });

        startHeroInterval();
    }

    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = mobileMenuToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navbar.contains(event.target);
            if (!isClickInsideNav && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Set active navigation link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });

    // Smooth scroll for anchor links (if on same page)
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle anchor links on the same page
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ============================================
    // Form Handling
    // ============================================
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formMessage = document.getElementById('formMessage');
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            const requiredFields = ['name', 'phone', 'pickup', 'destination', 'date', 'time'];
            let isValid = true;
            
            requiredFields.forEach(field => {
                const input = contactForm.querySelector(`[name="${field}"]`);
                if (!data[field] || data[field].trim() === '') {
                    isValid = false;
                    input.style.borderColor = '#ef4444';
                } else {
                    input.style.borderColor = '#e2e8f0';
                }
            });
            
            if (!isValid) {
                showFormMessage('Please fill in all required fields.', 'error');
                return;
            }
            
            // Phone number validation
            const phoneRegex = /^[\d\s\-\(\)]+$/;
            if (!phoneRegex.test(data.phone)) {
                showFormMessage('Please enter a valid phone number.', 'error');
                contactForm.querySelector('[name="phone"]').style.borderColor = '#ef4444';
                return;
            }
            
            // Email validation (if provided)
            if (data.email && data.email.trim() !== '') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(data.email)) {
                    showFormMessage('Please enter a valid email address.', 'error');
                    contactForm.querySelector('[name="email"]').style.borderColor = '#ef4444';
                    return;
                }
            }
            
            // Date validation (should not be in the past)
            const selectedDate = new Date(data.date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                showFormMessage('Please select a future date.', 'error');
                contactForm.querySelector('[name="date"]').style.borderColor = '#ef4444';
                return;
            }
            
            // Simulate form submission
            // In a real application, you would send this data to a server
            showFormMessage('Thank you! Your request has been submitted. We will contact you shortly.', 'success');
            
            // Log form data (in production, send to server)
            console.log('Form submission:', data);
            
            // Reset form after successful submission
            setTimeout(() => {
                contactForm.reset();
                formMessage.style.display = 'none';
            }, 5000);
        });
        
        function showFormMessage(message, type) {
            const formMessage = document.getElementById('formMessage');
            formMessage.textContent = message;
            formMessage.className = `form-message ${type}`;
            formMessage.style.display = 'block';
            
            // Scroll to message
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    // ============================================
    // Intersection Observer for Animations
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for fade-in animation
    const animateElements = document.querySelectorAll('.value-card, .service-card, .feature-item');
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
        observer.observe(el);
    });

    // ============================================
    // Set minimum date for date input to today
    // ============================================
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }

    // ============================================
    // Phone number formatting
    // ============================================
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value.length <= 3) {
                    value = `(${value}`;
                } else if (value.length <= 6) {
                    value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
                } else {
                    value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
                }
            }
            e.target.value = value;
        });
    }
});

// ============================================
// Performance Optimization
// ============================================
// Lazy load images if any are added in the future
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

