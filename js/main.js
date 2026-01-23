// ==========================================
// Trend Agency - Main JavaScript File
// ==========================================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // 1. Navbar Functionality
    // ==========================================
    
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileServicesBtn = document.getElementById('mobile-services-btn');
    const mobileServicesMenu = document.getElementById('mobile-services-menu');
    
    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add shadow on scroll
        if (currentScroll > 50) {
            navbar.classList.add('shadow-2xl');
        } else {
            navbar.classList.remove('shadow-2xl');
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        const icon = this.querySelector('i');
        
        if (mobileMenu.classList.contains('hidden')) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        } else {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        }
    });
    
    // Mobile services submenu toggle
    mobileServicesBtn.addEventListener('click', function() {
        mobileServicesMenu.classList.toggle('hidden');
        const icon = this.querySelector('i');
        icon.classList.toggle('fa-chevron-down');
        icon.classList.toggle('fa-chevron-up');
    });
    
    // Close mobile menu when clicking on links
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ==========================================
    // 2. Project Filter Functionality
    // ==========================================
    
    const filterButtons = document.querySelectorAll('.project-filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.classList.remove('bg-gradient-to-r', 'from-primary', 'to-secondary', 'text-white');
                btn.classList.add('bg-gray-200', 'text-gray-700');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            this.classList.remove('bg-gray-200', 'text-gray-700');
            this.classList.add('bg-gradient-to-r', 'from-primary', 'to-secondary', 'text-white');
            
            const filterValue = this.getAttribute('data-filter');
            
            projectItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Initialize first button as active
    if (filterButtons.length > 0) {
        filterButtons[0].classList.add('active');
        filterButtons[0].classList.add('bg-gradient-to-r', 'from-primary', 'to-secondary', 'text-white');
        filterButtons[0].classList.remove('bg-gray-200', 'text-gray-700');
    }
    
    // Add transition styles to project items
    projectItems.forEach(item => {
        item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });
    
    // ==========================================
    // 3. Scroll to Top Button
    // ==========================================
    
    const scrollTopBtn = document.getElementById('scroll-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.remove('opacity-0', 'invisible');
            scrollTopBtn.classList.add('opacity-100', 'visible');
        } else {
            scrollTopBtn.classList.remove('opacity-100', 'visible');
            scrollTopBtn.classList.add('opacity-0', 'invisible');
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ==========================================
    // 4. Contact Form Handling
    // ==========================================
    
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show success message
        const formData = new FormData(contactForm);
        
        // Create success message
        const successMessage = document.createElement('div');
        successMessage.className = 'fixed top-24 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-8 py-4 rounded-xl shadow-2xl z-50 flex items-center space-x-3 space-x-reverse';
        successMessage.innerHTML = `
            <i class="fas fa-check-circle text-2xl"></i>
            <div>
                <h4 class="font-bold">تم إرسال الرسالة بنجاح!</h4>
                <p class="text-sm">سنتواصل معك في أقرب وقت ممكن</p>
            </div>
        `;
        
        document.body.appendChild(successMessage);
        
        // Reset form
        contactForm.reset();
        
        // Remove message after 5 seconds
        setTimeout(() => {
            successMessage.style.opacity = '0';
            successMessage.style.transform = 'translate(-50%, -20px)';
            setTimeout(() => {
                successMessage.remove();
            }, 300);
        }, 5000);
        
        // Animate message appearance
        setTimeout(() => {
            successMessage.style.transition = 'all 0.3s ease';
        }, 10);
    });
    
    // ==========================================
    // 5. AOS (Animate On Scroll) - Lightweight Implementation
    // ==========================================
    
    const animateElements = document.querySelectorAll('[data-aos]');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const animateOnScroll = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        // Add delay if specified
        const delay = element.getAttribute('data-aos-delay');
        if (delay) {
            element.style.transitionDelay = delay + 'ms';
        }
        
        animateOnScroll.observe(element);
    });
    
    // Add animation class
    const style = document.createElement('style');
    style.textContent = `
        .aos-animate {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
    
    // ==========================================
    // 6. Service Cards Hover Effect
    // ==========================================
    
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // ==========================================
    // 7. Floating Animation for Hero Image
    // ==========================================
    
    const floatingElements = document.querySelectorAll('.floating');
    
    floatingElements.forEach(element => {
        let position = 0;
        let direction = 1;
        
        setInterval(() => {
            position += direction * 0.5;
            
            if (position > 10 || position < -10) {
                direction *= -1;
            }
            
            element.style.transform = `translateY(${position}px)`;
        }, 50);
    });
    
    // ==========================================
    // 8. Nav Link Active State
    // ==========================================
    
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveNav() {
        const scrollPosition = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('text-primary', 'font-bold');
                    link.classList.add('text-gray-700');
                    
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('text-primary', 'font-bold');
                        link.classList.remove('text-gray-700');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    
    // ==========================================
    // 9. Counter Animation for Stats
    // ==========================================
    
    const stats = document.querySelectorAll('.text-3xl, .text-4xl');
    
    function animateCounter(element) {
        const target = parseInt(element.textContent.replace(/\D/g, ''));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60 FPS
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            const prefix = element.textContent.includes('+') ? '+' : '';
            element.textContent = prefix + Math.floor(current);
        }, 16);
    }
    
    // Observe stats for animation
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const textContent = entry.target.textContent;
                if (/\d/.test(textContent)) {
                    animateCounter(entry.target);
                    entry.target.classList.add('counted');
                }
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => {
        if (/\d/.test(stat.textContent)) {
            statsObserver.observe(stat);
        }
    });
    
    // ==========================================
    // 10. Parallax Effect for Background Elements
    // ==========================================
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.absolute');
        
        parallaxElements.forEach((element, index) => {
            const speed = (index + 1) * 0.05;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // ==========================================
    // 11. Pulse Animation for SVG Elements
    // ==========================================
    
    const pulseElements = document.querySelectorAll('.pulse');
    
    pulseElements.forEach((element, index) => {
        let scale = 1;
        let growing = true;
        
        setInterval(() => {
            if (growing) {
                scale += 0.01;
                if (scale >= 1.2) growing = false;
            } else {
                scale -= 0.01;
                if (scale <= 1) growing = true;
            }
            
            element.setAttribute('r', parseFloat(element.getAttribute('r')) * scale / (scale - 0.01));
        }, 50 + index * 20);
    });
    
    // ==========================================
    // 12. Loading Animation
    // ==========================================
    
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    });
    
    // ==========================================
    // 13. Enhanced Partner Logos Animation
    // ==========================================
    
    const partnerLogos = document.querySelectorAll('.partner-logo');
    
    partnerLogos.forEach((logo, index) => {
        logo.style.animationDelay = `${index * 0.1}s`;
    });
    
    // ==========================================
    // Console Welcome Message
    // ==========================================
    
    console.log('%c🎨 Trend Agency', 'color: #1e3a8a; font-size: 24px; font-weight: bold;');
    console.log('%cWebsite Loaded Successfully ✓', 'color: #10b981; font-size: 14px;');
    console.log('%cDeveloped with ❤️ using HTML, TailwindCSS & Vanilla JavaScript', 'color: #6b7280; font-size: 12px;');
    
});

// ==========================================
// Additional Utility Functions
// ==========================================

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

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ==========================================
// End of Main JavaScript File
// ==========================================