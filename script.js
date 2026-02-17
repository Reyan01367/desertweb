// ============================================
// Desert Drive — JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // --- Mobile Menu Toggle ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = navbar.offsetHeight + 20;
                const position = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: position,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Scroll Animations (Intersection Observer) ---
    const animateElements = document.querySelectorAll(
        '.about-grid, .package-card, .vehicle-card, .safety-grid, ' +
        '.gallery-item, .testimonial-card, .contact-grid, .section-header, ' +
        '.cta-content'
    );

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animations for grid items
                const delay = entry.target.classList.contains('package-card') ||
                              entry.target.classList.contains('vehicle-card') ||
                              entry.target.classList.contains('testimonial-card') ||
                              entry.target.classList.contains('gallery-item')
                    ? index * 100 : 0;

                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, delay);

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1), transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });

    // --- Active Nav Link Highlight ---
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.querySelectorAll('a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // --- Contact Form Handling ---
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Gather form data
            const formData = new FormData(contactForm);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            // Show success message
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = '✓ Request Sent!';
            btn.style.background = '#4CAF50';
            btn.style.borderColor = '#4CAF50';
            btn.disabled = true;

            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                btn.style.borderColor = '';
                btn.disabled = false;
                contactForm.reset();
            }, 3000);
        });
    }

    // --- Newsletter Form Handling ---
    const newsletterForm = document.querySelector('.newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = newsletterForm.querySelector('input');
            const btn = newsletterForm.querySelector('button');
            const originalText = btn.textContent;

            btn.textContent = '✓ Subscribed!';
            btn.style.background = '#4CAF50';

            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                input.value = '';
            }, 2500);
        });
    }

    // --- Parallax Effect on Hero ---
    const hero = document.querySelector('.hero');

    window.addEventListener('scroll', () => {
        if (hero) {
            const scrolled = window.pageYOffset;
            if (scrolled < window.innerHeight) {
                hero.style.backgroundPositionY = `${scrolled * 0.4}px`;
            }
        }
    });

    // --- Counter Animation for Stats ---
    const stats = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    const animateCounter = (el) => {
        const text = el.textContent;
        const isPercentage = text.includes('%');
        const isDecimal = text.includes('.');
        const target = parseFloat(text);

        if (isNaN(target)) return;

        const duration = 1500;
        const steps = 40;
        const stepTime = duration / steps;
        let current = 0;
        const increment = target / steps;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            if (isDecimal) {
                el.textContent = current.toFixed(1);
            } else if (isPercentage) {
                el.textContent = Math.round(current) + '%';
            } else {
                el.textContent = Math.round(current);
            }
        }, stepTime);
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                statsAnimated = true;
                stats.forEach((stat, i) => {
                    setTimeout(() => animateCounter(stat), i * 200);
                });
            }
        });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }

    // --- Image Lazy Load Enhancement ---
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });
    });
});

