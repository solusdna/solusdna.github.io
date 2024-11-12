import { i18n } from './i18n.js';

document.addEventListener('DOMContentLoaded', () => {
    // Добавляем перевод при загрузке страницы
    i18n.translate();

    const navbar = document.querySelector('.navbar');
    const learnMoreButtons = document.querySelectorAll('.learn-more-button');

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            
            if (targetId.startsWith('http')) {
                return true;
            }

            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const cards = entry.target.querySelectorAll('.level-card, .reward-info-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, index * 100);
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.levels-section, .rewards-section').forEach(
        section => observer.observe(section)
    );

    learnMoreButtons.forEach(button => {
        button.addEventListener('click', () => {
            const currentLevel = button.closest('.level');
            const currentInfo = currentLevel.querySelector('.additional-info');
            const isVisible = currentInfo.classList.contains('visible');

            document.querySelectorAll('.level').forEach(level => {
                if (level !== currentLevel) {
                    const info = level.querySelector('.additional-info');
                    const btn = level.querySelector('.learn-more-button');
                    info.classList.remove('visible');
                    info.style.display = 'none';
                    btn.setAttribute('data-i18n', 'levels.showMore');
                    i18n.translate();
                }
            });

            if (!isVisible) {
                currentInfo.style.display = 'block';
                setTimeout(() => currentInfo.classList.add('visible'), 10);
                button.setAttribute('data-i18n', 'levels.showLess');
            } else {
                currentInfo.classList.remove('visible');
                setTimeout(() => currentInfo.style.display = 'none', 300);
                button.setAttribute('data-i18n', 'levels.showMore');
            }
            i18n.translate();
        });
    });
});