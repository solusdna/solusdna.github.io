function startPageTransition(event) {
    event.preventDefault();
    const targetUrl = event.currentTarget.href;
    
    // Добавляем оверлей для анимации перехода
    const overlay = document.createElement('div');
    overlay.className = 'page-transition-overlay';
    document.body.appendChild(overlay);
    
    // Анимируем оверлей
    setTimeout(() => {
        overlay.style.opacity = '1';
    }, 0);
    
    // Переходим на новую страницу после анимации
    setTimeout(() => {
        window.location.href = targetUrl;
    }, 500);
}

// Добавляем обработчик для анимации при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.querySelector('.page-transition-overlay');
    if (overlay) {
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.remove();
        }, 500);
    }
});