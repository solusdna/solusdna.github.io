import { i18n } from './i18n.js';

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
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
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = '#0C0E1C';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.backgroundColor = '#0C0E1C';
            navbar.style.boxShadow = 'none';
        }
    });

    document.querySelector('.welcome-section').style.opacity = '0';
    setTimeout(() => {
        document.querySelector('.welcome-section').style.transition = 'opacity 0.8s ease-out';
        document.querySelector('.welcome-section').style.opacity = '1';
    }, 100);
});