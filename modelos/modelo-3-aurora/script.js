// ============================================
// MODELO 3: AURORA - JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Cursor glow effect
    const cursorGlow = document.querySelector('.cursor-glow');
    
    if (cursorGlow && window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        });
        
        document.addEventListener('mouseenter', () => {
            cursorGlow.style.opacity = '0.3';
        });
        
        document.addEventListener('mouseleave', () => {
            cursorGlow.style.opacity = '0';
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(13, 13, 15, 0.95)';
        } else {
            navbar.style.background = 'rgba(13, 13, 15, 0.8)';
        }
    });

    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navCta = document.querySelector('.nav-cta');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-active');
            navCta.classList.toggle('mobile-active');
        });
    }

    // Add mobile menu styles
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .nav-links.mobile-active {
                display: flex;
                flex-direction: column;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: var(--dark-800);
                padding: 20px;
                gap: 20px;
                border-bottom: 1px solid var(--dark-600);
            }
            
            .nav-cta.mobile-active {
                display: flex;
                position: absolute;
                top: calc(100% + 180px);
                left: 20px;
                right: 20px;
                justify-content: center;
            }
        }
    `;
    document.head.appendChild(style);

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add animation styles
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        .animate-element {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-element.animate-visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .stagger-1 { transition-delay: 0.1s; }
        .stagger-2 { transition-delay: 0.2s; }
        .stagger-3 { transition-delay: 0.3s; }
        .stagger-4 { transition-delay: 0.4s; }
        .stagger-5 { transition-delay: 0.5s; }
        .stagger-6 { transition-delay: 0.6s; }
    `;
    document.head.appendChild(animationStyle);

    // Observe elements
    const animateElements = document.querySelectorAll('.area-card, .benefit-card, .step-card, .testimonial-card, .model-node, .contact-link, .highlight-item');
    animateElements.forEach((el, index) => {
        el.classList.add('animate-element');
        el.classList.add(`stagger-${(index % 6) + 1}`);
        observer.observe(el);
    });

    // Parallax for hero elements
    const heroGradient = document.querySelector('.hero-gradient');
    const floatingElements = document.querySelectorAll('.floating-element');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        if (heroGradient) {
            heroGradient.style.transform = `translate(${scrolled * 0.1}px, ${scrolled * 0.2}px)`;
        }
        
        floatingElements.forEach((el, index) => {
            const speed = 0.05 + (index * 0.02);
            el.style.transform = `translateY(${-scrolled * speed}px)`;
        });
    });

    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const btnContent = submitBtn.querySelector('.btn-content');
            const originalText = btnContent.textContent;
            
            btnContent.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                btnContent.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-right: 8px;"><polyline points="20 6 9 17 4 12"></polyline></svg>Mensagem enviada!';
                
                setTimeout(() => {
                    btnContent.textContent = originalText;
                    submitBtn.disabled = false;
                    this.reset();
                }, 3000);
            }, 1500);
        });
    }

    // Typing effect for hero title (optional enhancement)
    const titleAccent = document.querySelector('.title-accent');
    if (titleAccent) {
        titleAccent.style.opacity = '0';
        titleAccent.style.transform = 'translateY(20px)';
        titleAccent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            titleAccent.style.opacity = '1';
            titleAccent.style.transform = 'translateY(0)';
        }, 500);
    }

    // Counter animation for stats
    const animateCounter = (element, target, duration = 2000) => {
        let start = 0;
        const increment = target / (duration / 16);
        
        const updateCounter = () => {
            start += increment;
            if (start < target) {
                element.textContent = '+' + Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = '+' + target;
            }
        };
        
        updateCounter();
    };

    // Observe stat for counter animation
    const statValue = document.querySelector('.stat-value');
    if (statValue) {
        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(statValue, 500);
                    statObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statObserver.observe(statValue);
    }

    console.log('🌌 Modelo Aurora carregado com sucesso!');
});

