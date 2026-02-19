// Seletores
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// ========================================
// NAVEGAÇÃO E MENU MOBILE
// ========================================
const navbar = $('.navbar');
const menuToggle = $('.menu-toggle');
const navLinks = $('.nav-links');

// Scroll navbar
window.addEventListener('scroll', () => 
    navbar.classList.toggle('navbar-active', window.scrollY > 50)
);

// Menu mobile
menuToggle?.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Fecha menu ao clicar no link
$$('.nav-links a').forEach(link => 
    link.addEventListener('click', () => {
        menuToggle?.classList.remove('active');
        navLinks?.classList.remove('active');
    })
);

// ========================================
// FILTRO PORTFÓLIO
// ========================================
$$('.filter-btn').forEach(btn => 
    btn.addEventListener('click', () => {
        $$('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        $$('.portfolio-item').forEach(item => {
            const show = filter === 'all' || item.dataset.category === filter;
            item.classList.toggle('hidden', !show);
            setTimeout(() => item.style.display = show ? 'block' : 'none', show ? 10 : 300);
        });
    })
);

// ========================================
// FAQ ACCORDION
// ========================================
$$('.faq-item').forEach(item => 
    item.querySelector('.faq-question').addEventListener('click', () => {
        $$('.faq-item').forEach(other => other !== item && other.classList.remove('active'));
        item.classList.toggle('active');
    })
);

// ========================================
// FORMULÁRIO → WHATSAPP
// ========================================
$('#contactForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const msg = `
*Nova Solicitação de Orçamento*

*Nome:* ${data.get('name')}
*Email:* ${data.get('email')}
*Telefone:* ${data.get('phone')}
*Serviço:* ${data.get('service')}
*Mensagem:* ${data.get('message')}`.trim();
    
    window.open(`https://wa.me/5585988208404?text=${encodeURIComponent(msg)}`, '_blank');
    e.target.reset();
    alert('Redirecionando para o WhatsApp...');
});

// ========================================
// SCROLL REVEAL
// ========================================
const reveal = () => {
    const windowHeight = window.innerHeight;
    $$('.reveal').forEach(el => {
        if (el.getBoundingClientRect().top < windowHeight - 150) {
            el.classList.add('active');
        }
    });
};

window.addEventListener('scroll', reveal);

// ========================================
// SMOOTH SCROLL
// ========================================
$$('a[href^="#"]').forEach(anchor => 
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = $(anchor.getAttribute('href'));
        target && window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth'
        });
    })
);

// ========================================
// CONTADOR ANIMADO
// ========================================
const animateCounter = (el, target, duration = 2000) => {
    let current = 0;
    const increment = target / (duration / 16);
    const suffix = el.textContent.replace(/[0-9]/g, '');
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            el.textContent = target + suffix;
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(current) + suffix;
        }
    }, 16);
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const h3 = entry.target.querySelector('h3');
            const num = parseInt(h3.textContent.match(/\d+/)?.[0]);
            num && animateCounter(h3, num);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

$$('.stat-item').forEach(stat => statsObserver.observe(stat));

// ========================================
// INIT
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    ['.service-card', '.portfolio-item', '.process-step', 
     '.testimonial-card', '.about-values', '.tech-stack']
        .forEach(sel => $$(sel).forEach(el => el.classList.add('reveal')));
    
    reveal();
    console.log('🚀 Svcoil carregado!');
});