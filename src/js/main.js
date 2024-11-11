document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = '#0C0E1C';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.backgroundColor = '#0C0E1C';
            navbar.style.boxShadow = 'none';
        }
    });

    // Add page load animation
    document.querySelector('.welcome-section').style.opacity = '0';
    setTimeout(() => {
        document.querySelector('.welcome-section').style.transition = 'opacity 0.8s ease-out';
        document.querySelector('.welcome-section').style.opacity = '1';
    }, 100);
});