document.addEventListener('DOMContentLoaded', () => {
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
});