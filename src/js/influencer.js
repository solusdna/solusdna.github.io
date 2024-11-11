document.addEventListener('DOMContentLoaded', () => {
    // Инициализация переменных
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    const navbar = document.querySelector('.navbar');
    const learnMoreButtons = document.querySelectorAll('.learn-more-button');
    const categoryButtons = document.querySelectorAll('.category-button');
    const showFormButtons = document.querySelectorAll('#showFormButton, #finalCtaButton, .showFormButton');
    const modalOverlay = document.getElementById('modalOverlay');
    const closeModal = document.querySelector('.close-modal');
    const rewardsSection = document.querySelector('.rewards-section');

    // Данные для TaskBoard
    const categoryData = {
        explorers: {
            baseCPM: '1x',
            categories: [
                { name: 'Token Oriented Content', ratio: 1 },
                { name: 'Video Sharing', ratio: 0.8 },
                { name: 'News', ratio: 0.8 }
            ]
        },
        connectors: {
            baseCPM: '2x',
            categories: [
                { name: 'Token Oriented Content', ratio: 1 },
                { name: 'Platform Oriented Content', ratio: 1 },
                { name: 'Video Sharing', ratio: 0.8 },
                { name: 'News', ratio: 0.8 },
                { name: 'Narrative Shill', ratio: 1.2 },
                { name: 'Deep Analysis', ratio: 1.5 }
            ]
        },
        masterminds: {
            baseCPM: '3.2x',
            categories: [
                { name: 'Token Oriented Content', ratio: 1 },
                { name: 'Platform Oriented Content', ratio: 1 },
                { name: 'Video Sharing', ratio: 0.8 },
                { name: 'News', ratio: 0.8 },
                { name: 'Narrative Shill', ratio: 1.2 },
                { name: 'Deep Analysis', ratio: 1.5 },
                { name: 'StormTrade Academy', ratio: 1.2 },
                { name: 'Trading Competitions', ratio: 1.2 }
            ]
        }
    };

    // Плавная прокрутка для навигации
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            
            if (targetId === '#' || link.id === 'showFormButton') {
                toggleModal();
                return;
            }
            
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

    // Анимация при скролле
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const cards = entry.target.querySelectorAll('.level-card, .reward-card, .task-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, index * 100);
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Наблюдаем за секциями
    document.querySelectorAll('.levels-section, .rewards-section, .taskboard-section').forEach(
        section => observer.observe(section)
    );

    // Обработка нопок Learn More
    learnMoreButtons.forEach(button => {
        button.addEventListener('click', () => {
            const currentLevel = button.closest('.level');
            const currentInfo = currentLevel.querySelector('.additional-info');
            const isVisible = currentInfo.classList.contains('visible');

            // Закрываем все открытые info блоки
            document.querySelectorAll('.level').forEach(level => {
                if (level !== currentLevel) {
                    const info = level.querySelector('.additional-info');
                    const btn = level.querySelector('.learn-more-button');
                    info.classList.remove('visible');
                    info.style.display = 'none';
                    btn.textContent = 'Learn More';
                }
            });

            // Переключаем текущий блок
            if (!isVisible) {
                currentInfo.style.display = 'block';
                setTimeout(() => currentInfo.classList.add('visible'), 10);
            } else {
                currentInfo.classList.remove('visible');
                setTimeout(() => currentInfo.style.display = 'none', 300);
            }

            button.textContent = isVisible ? 'Learn More' : 'Show Less';
        });
    });

    // Функция для модального окна
    function toggleModal() {
        if (modalOverlay) {
            modalOverlay.classList.toggle('visible');
            document.body.classList.toggle('scroll-lock');
        }
    }

    // Добавляем обработчики для всех кнопок Apply Now
    showFormButtons.forEach(button => {
        button.addEventListener('click', toggleModal);
    });

    if (closeModal) {
        closeModal.addEventListener('click', toggleModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) toggleModal();
        });
    }

    // Обработка формы
    const applicationForm = document.getElementById('applicationForm');
    if (applicationForm) {
        applicationForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(applicationForm);
            const data = Object.fromEntries(formData);

            try {
                const response = await fetch('YOUR_API_ENDPOINT', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    showToast('Application submitted successfully!');
                    toggleModal();
                    applicationForm.reset();
                } else {
                    throw new Error('Failed to submit application');
                }
            } catch (error) {
                showToast('Failed to submit application. Please try again.');
                console.error('Error:', error);
            }
        });
    }

    // Toast уведомления
    function showToast(message) {
        const toast = document.createElement('div');
        toast.classList.add('toast');
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => toast.classList.add('visible'), 100);
        setTimeout(() => {
            toast.classList.remove('visible');
            setTimeout(() => document.body.removeChild(toast), 300);
        }, 3000);
    }

    // Инициализация таблицы CPM
    function initCPMTable() {
        const tableContent = document.querySelector('.table-content');
        const tabButtons = document.querySelectorAll('.tab-button');
        
        if (!tableContent || !tabButtons.length) {
            console.error('Required elements not found for CPM table');
            return;
        }

        function renderCategory(category) {
            const data = categoryData[category];
            if (!data) return;
            
            // Сначала удаляем старый контент с анимацией
            if (tableContent.children.length) {
                tableContent.children[0].style.opacity = '0';
                tableContent.children[0].style.transform = 'translateY(10px)';
                setTimeout(() => {
                    tableContent.innerHTML = '';
                    renderNewContent();
                }, 300);
            } else {
                renderNewContent();
            }
            
            function renderNewContent() {
                const content = `
                    <div class="content-row">
                        <div class="base-cpm-value">${data.baseCPM}</div>
                        <div class="categories-list">
                            ${data.categories.map(cat => `
                                <div class="category-item">
                                    <span class="category-name">${cat.name}</span>
                                    <span class="category-ratio">CPM Ratio: ×${cat.ratio}</span>
                                </div>
                            `).join('')}
                        </div>
                        <div class="platforms-list">
                            <div class="platform-item">
                                <div class="platform-item-header">
                                    <div class="platform-icon">
                                        <svg class="x-twitter" viewBox="0 0 24 24" aria-hidden="true" width="18" height="18">
                                            <path fill="#8EE96F" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                                        </svg>
                                    </div>
                                    <div class="platform-name">X (Twitter)</div>
                                </div>
                                <div class="platform-cost">$10 per 1000 impressions</div>
                            </div>
                            <div class="platform-item">
                                <div class="platform-item-header">
                                    <div class="platform-icon">
                                        <i class="fa-brands fa-telegram"></i>
                                    </div>
                                    <div class="platform-name">Telegram</div>
                                </div>
                                <div class="platform-cost">$25 per 1000 impressions</div>
                            </div>
                            <div class="platform-item">
                                <div class="platform-item-header">
                                    <div class="platform-icon">
                                        <i class="fa-brands fa-youtube"></i>
                                    </div>
                                    <div class="platform-name">Youtube</div>
                                </div>
                                <div class="platform-cost">$50 per 1000 impressions</div>
                            </div>
                        </div>
                    </div>
                `;
                tableContent.innerHTML = content;
            }
        }

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                renderCategory(button.dataset.category);
            });
        });

        // Инициализация с первой категорией
        renderCategory('explorers');
    }

    // Вызываем функцию после полной загрузки DOM
    initCPMTable();

    const handleScroll = () => {
        const rect = rewardsSection.getBoundingClientRect();
        const scrollProgress = 1 - (rect.top / window.innerHeight);
        
        if (scrollProgress > 0.2 && scrollProgress < 1) {
            rewardsSection.classList.add('scrolled');
        } else {
            rewardsSection.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Инициализация при загрузке
});