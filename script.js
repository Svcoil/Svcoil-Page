/* ========================================
   NAVEGAÇÃO COM SCROLL
   ======================================== */
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-active');
    } else {
        navbar.classList.remove('navbar-active');
    }
});

/* ========================================
   MENU MOBILE HAMBURGUER
   ======================================== */
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Fecha o menu ao clicar em um link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

/* ========================================
   FILTRO DO PORTFÓLIO
   ======================================== */
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active de todos os botões
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Adiciona active no botão clicado
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filter === 'all') {
                item.classList.remove('hidden');
                setTimeout(() => {
                    item.style.display = 'block';
                }, 10);
            } else {
                if (item.getAttribute('data-category') === filter) {
                    item.classList.remove('hidden');
                    setTimeout(() => {
                        item.style.display = 'block';
                    }, 10);
                } else {
                    item.classList.add('hidden');
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            }
        });
    });
});

/* ========================================
   FAQ ACCORDION
   ======================================== */
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Fecha outros itens abertos
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle no item atual
        item.classList.toggle('active');
    });
});

/* ========================================
   FORMULÁRIO DE CONTATO
   ======================================== */
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const service = formData.get('service');
    const message = formData.get('message');
    
    // Cria mensagem para WhatsApp
    const whatsappMessage = `
*Nova Solicitação de Orçamento*

*Nome:* ${name}
*Email:* ${email}
*Telefone:* ${phone}
*Serviço:* ${service}
*Mensagem:* ${message}
    `.trim();
    
    const whatsappURL = `https://wa.me/5585988208404?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Abre WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Limpa o formulário
    contactForm.reset();
    
    // Feedback visual
    alert('Redirecionando para o WhatsApp...');
});

/* ========================================
   SCROLL REVEAL (ANIMAÇÕES)
   ======================================== */
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', reveal);

// Adiciona classe reveal aos elementos que devem ter animação
document.addEventListener('DOMContentLoaded', () => {
    // Adiciona animação de reveal em seções específicas
    const sectionsToAnimate = [
        '.service-card',
        '.portfolio-item',
        '.process-step',
        '.testimonial-card',
        '.about-values',
        '.tech-stack'
    ];
    
    sectionsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.classList.add('reveal');
        });
    });
    
    // Trigger inicial
    reveal();
});

/* ========================================
   SMOOTH SCROLL
   ======================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // 80px para compensar navbar fixa
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

/* ========================================
   CONTADOR ANIMADO PARA STATS
   ======================================== */
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const suffix = element.textContent.replace(/[0-9]/g, '');
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 16);
}

// Observa quando os stats aparecem na tela
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('h3');
            const textContent = statNumber.textContent;
            const number = parseInt(textContent.match(/\d+/)[0]);
            
            animateCounter(statNumber, number);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
});

/* ========================================
   LOADING DO SITE
   ======================================== */
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

console.log('🚀 Site Svcoil carregado com sucesso!');