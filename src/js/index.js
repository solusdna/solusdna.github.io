import { i18n } from './i18n.js';

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    i18n.translate();

    const roleCards = document.querySelectorAll('.role-card');
    const mainTitle = document.querySelector('.main-title');
    const description = document.querySelector('.description');

    function animateElements() {
        mainTitle.classList.add('animate');
        
        setTimeout(() => {
            description.classList.add('animate');
        }, 200);

        roleCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animate');
            }, 400 + (index * 200));
        });
    }

    i18n.translate();

    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.role-card, .main-title, .description').forEach(
        element => observer.observe(element)
    );

    window.addEventListener('load', animateElements);

    document.querySelectorAll('.benefit-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / card.clientWidth) * 100;
            const y = ((e.clientY - rect.top) / card.clientHeight) * 100;
            card.style.setProperty('--mouse-x', `${x}%`);
            card.style.setProperty('--mouse-y', `${y}%`);
        });
    });
});