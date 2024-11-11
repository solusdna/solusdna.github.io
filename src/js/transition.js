function startPageTransition(event) {
    event.preventDefault();
    const targetUrl = event.currentTarget.href;
    
    
    const overlay = document.createElement('div');
    overlay.className = 'page-transition-overlay';
    document.body.appendChild(overlay);
    
    setTimeout(() => {
        overlay.style.opacity = '1';
    }, 0);
    
    
    setTimeout(() => {
        window.location.href = targetUrl;
    }, 500);
}


document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.querySelector('.page-transition-overlay');
    if (overlay) {
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.remove();
        }, 500);
    }
});