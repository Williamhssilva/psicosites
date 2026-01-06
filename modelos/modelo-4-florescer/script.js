// ==========================================
// MODELO 4 - FLORESCER
// JavaScript Interativo
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todos os módulos
    initNavigation();
    initScrollAnimations();
    initDepoimentos();
    initContactForm();
    initParallax();
});

// ==========================================
// NAVEGAÇÃO
// ==========================================
function initNavigation() {
    const navDots = document.querySelectorAll('.nav-dot');
    const sections = document.querySelectorAll('section[id]');
    
    // Atualizar navegação no scroll
    function updateActiveNav() {
        const scrollPosition = window.scrollY + window.innerHeight / 3;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navDots.forEach(dot => {
                    dot.classList.remove('active');
                    if (dot.getAttribute('href') === '#' + sectionId) {
                        dot.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Smooth scroll para navegação
    navDots.forEach(dot => {
        dot.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Smooth scroll para todos os links internos
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();
}

// ==========================================
// ANIMAÇÕES DE SCROLL
// ==========================================
function initScrollAnimations() {
    // Elementos para animar
    const animatedElements = document.querySelectorAll(`
        .hero-tag,
        .hero h1,
        .hero-subtitle,
        .hero-cta,
        .hero-visual,
        .sobre-content,
        .sobre-image-stack,
        .section-header-center,
        .tcc-visual,
        .beneficio-card,
        .servicos-header,
        .servico-card,
        .depoimento-card,
        .contato-info,
        .contato-form,
        .credential-item
    `);
    
    // Configurar Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Aplicar estilos iniciais e observar
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.05}s, transform 0.6s ease ${index * 0.05}s`;
        observer.observe(el);
    });
    
    // Adicionar classe para animação
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
    
    // Animação especial para orbit items
    const orbitItems = document.querySelectorAll('.orbit-item');
    orbitItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        item.style.transition = `all 0.5s ease ${0.3 + index * 0.15}s`;
    });
    
    const orbitObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const items = entry.target.querySelectorAll('.orbit-item');
                items.forEach(item => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                });
                orbitObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const tccVisual = document.querySelector('.tcc-visual');
    if (tccVisual) {
        orbitObserver.observe(tccVisual);
    }
}

// ==========================================
// DEPOIMENTOS CAROUSEL
// ==========================================
function initDepoimentos() {
    const depoimentos = [
        {
            text: 'A terapia com a Letícia me ajudou a entender padrões que eu não conseguia ver sozinha. Hoje me sinto mais leve e confiante para enfrentar os desafios.',
            author: 'Marina S.',
            time: 'Paciente há 1 ano',
            initial: 'M'
        },
        {
            text: 'Encontrei na Letícia uma profissional acolhedora e muito competente. O processo terapêutico transformou minha forma de lidar com a ansiedade.',
            author: 'Pedro R.',
            time: 'Paciente há 8 meses',
            initial: 'P'
        },
        {
            text: 'Agradeço muito pelo cuidado e profissionalismo. As sessões me ajudaram a desenvolver autoconhecimento e ferramentas práticas para o dia a dia.',
            author: 'Carla M.',
            time: 'Paciente há 6 meses',
            initial: 'C'
        }
    ];
    
    let currentIndex = 0;
    
    const card = document.querySelector('.depoimento-card');
    const blockquote = card?.querySelector('blockquote');
    const authorName = card?.querySelector('.author-info strong');
    const authorTime = card?.querySelector('.author-info span');
    const authorAvatar = card?.querySelector('.author-avatar');
    const dots = document.querySelectorAll('.nav-dots .dot');
    const prevBtn = document.querySelector('.nav-btn.prev');
    const nextBtn = document.querySelector('.nav-btn.next');
    
    function updateDepoimento(index) {
        if (!card) return;
        
        // Fade out
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            // Atualizar conteúdo
            const dep = depoimentos[index];
            if (blockquote) blockquote.textContent = dep.text;
            if (authorName) authorName.textContent = dep.author;
            if (authorTime) authorTime.textContent = dep.time;
            if (authorAvatar) authorAvatar.textContent = dep.initial;
            
            // Atualizar dots
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            
            // Fade in
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 300);
    }
    
    function nextDepoimento() {
        currentIndex = (currentIndex + 1) % depoimentos.length;
        updateDepoimento(currentIndex);
    }
    
    function prevDepoimento() {
        currentIndex = (currentIndex - 1 + depoimentos.length) % depoimentos.length;
        updateDepoimento(currentIndex);
    }
    
    if (nextBtn) nextBtn.addEventListener('click', nextDepoimento);
    if (prevBtn) prevBtn.addEventListener('click', prevDepoimento);
    
    // Click nos dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateDepoimento(currentIndex);
        });
    });
    
    // Auto-play
    setInterval(nextDepoimento, 6000);
    
    // Adicionar transição ao card
    if (card) {
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    }
}

// ==========================================
// FORMULÁRIO DE CONTATO
// ==========================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (!form) return;
    
    // Máscara de telefone
    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length <= 11) {
                if (value.length > 2) {
                    value = '(' + value.substring(0, 2) + ') ' + value.substring(2);
                }
                if (value.length > 10) {
                    value = value.substring(0, 10) + '-' + value.substring(10);
                }
            }
            
            e.target.value = value;
        });
    }
    
    // Envio do formulário
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.btn-submit');
        const originalContent = submitBtn.innerHTML;
        
        // Loading state
        submitBtn.innerHTML = `
            <svg class="spinner" viewBox="0 0 24 24" style="width: 20px; height: 20px; animation: spin 1s linear infinite;">
                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="30 70"/>
            </svg>
            Enviando...
        `;
        submitBtn.disabled = true;
        
        // Simular envio
        setTimeout(() => {
            // Success state
            submitBtn.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 20px; height: 20px;">
                    <path d="M5 13L9 17L19 7"/>
                </svg>
                Mensagem Enviada!
            `;
            submitBtn.style.background = 'var(--sage)';
            
            // Reset form
            form.reset();
            
            // Voltar ao normal
            setTimeout(() => {
                submitBtn.innerHTML = originalContent;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        }, 1500);
    });
    
    // Adicionar estilo para spinner
    const spinnerStyle = document.createElement('style');
    spinnerStyle.textContent = `
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(spinnerStyle);
}

// ==========================================
// EFEITO PARALLAX
// ==========================================
function initParallax() {
    const blobs = document.querySelectorAll('.blob');
    const leaves = document.querySelectorAll('.leaf');
    
    let ticking = false;
    
    function updateParallax() {
        const scrollY = window.scrollY;
        
        blobs.forEach((blob, index) => {
            const speed = 0.05 + (index * 0.02);
            blob.style.transform = `translateY(${scrollY * speed}px)`;
        });
        
        leaves.forEach((leaf, index) => {
            const speed = 0.1 + (index * 0.03);
            const rotation = scrollY * 0.1;
            leaf.style.transform = `translateY(${scrollY * speed}px) rotate(${rotation}deg)`;
        });
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
}

// ==========================================
// UTILITÁRIOS
// ==========================================

// Debounce function
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

// Smooth reveal on scroll
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('revealed');
        }
    });
}

window.addEventListener('scroll', debounce(revealOnScroll, 10));

