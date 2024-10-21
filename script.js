document.addEventListener('DOMContentLoaded', () => {
    const ctaButton = document.querySelector('.cta-button');
    const categoriesSection = document.querySelector('.categories-section');
    const learnMoreButtons = document.querySelectorAll('.learn-more-button');
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    const categoryButtons = document.querySelectorAll('.category-button');
    const baseCPMValue = document.querySelector('.cpm-value');
    const categoryList = document.querySelector('.category-list');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    const categoryData = {
        explorers: {
            baseCPM: '1x',
            categories: [
                { name: 'Token Oriented Content', ratio: 1 },
                { name: 'Video Sharing', ratio: 0.8 },
                { name: 'News', ratio: 0.8 }
            ]
        },
        contributors: {
            baseCPM: '2x',
            categories: [
                { name: 'Token Oriented Content', ratio: 1 },
                { name: 'Video Sharing', ratio: 0.8 },
                { name: 'News', ratio: 0.8 },
                { name: 'Narrative Shill', ratio: 1.2 },
                { name: 'Ambassador Program', ratio: 1.2 },
                { name: 'Deep Analysis', ratio: 1.5 },
            ]
        },
        ambassadors: {
            baseCPM: '3.2x',
            categories: [
                { name: 'Token Oriented Content', ratio: 1 },
                { name: 'Video Sharing', ratio: 0.8 },
                { name: 'News', ratio: 0.8 },
                { name: 'Narrative Shill', ratio: 1.2 },
                { name: 'Deep Analysis', ratio: 1.5 },
                { name: 'StormTrade Academy', ratio: 1.2 },
                { name: 'Trading Competitions', ratio: 1.2 },
                { name: 'Other/Special', ratio: 'TBD' }
            ]
        }
    };

    function updateTaskboard(category) {
        const data = categoryData[category];
        baseCPMValue.textContent = data.baseCPM;
        categoryList.innerHTML = '';
        data.categories.forEach(cat => {
            const li = document.createElement('li');
            li.innerHTML = `${cat.name} <span>CPM Ratio: ${cat.ratio}</span>`;
            li.style.opacity = '0';
            li.style.transform = 'translateY(20px)';
            categoryList.appendChild(li);
            setTimeout(() => {
                li.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                li.style.opacity = '1';
                li.style.transform = 'translateY(0)';
            }, 50);
        });
    }

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            updateTaskboard(button.dataset.category);
        });
    });

    // Инициализация с данными для Explorers
    updateTaskboard('explorers');

    document.querySelector('.taskboard-title').classList.add('hidden');
    document.querySelector('.taskboard').classList.add('hidden');

    ctaButton.addEventListener('click', () => {
        const welcomeContainer = document.querySelector('.welcome-container');
        welcomeContainer.classList.add('moved');
        
        document.body.style.overflow = 'auto';
        
        setTimeout(() => {
            welcomeContainer.style.display = 'none';
            
            document.querySelector('.purpose-section').classList.add('visible');
            document.querySelector('.ambassador-roles').classList.add('visible');
            document.querySelector('.rewards-section').classList.remove('hidden');
            document.querySelector('.rewards-section').classList.add('visible');
            document.querySelector('.tasks-evaluation-section').classList.remove('hidden');
            document.querySelector('.tasks-evaluation-section').classList.add('visible');
            categoriesSection.classList.remove('hidden');
            setTimeout(() => {
                categoriesSection.classList.add('visible');
            }, 50);
            document.querySelector('.taskboard-title').classList.remove('hidden');
            document.querySelector('.taskboard').classList.remove('hidden');
            setTimeout(() => {
                document.querySelector('.taskboard-title').classList.add('visible');
                document.querySelector('.taskboard').classList.add('visible');
            }, 50);
            document.querySelector('.steps-section').classList.remove('hidden');
            setTimeout(() => {
                document.querySelector('.steps-section').classList.add('visible');
            }, 50);
            document.querySelector('.final-cta').classList.remove('hidden');
            setTimeout(() => {
                document.querySelector('.final-cta').classList.add('visible');
            }, 100);
        }, 500);
    });

    learnMoreButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const category = event.target.closest('.category');
            const additionalInfo = category.querySelector('.additional-info');
            const isVisible = additionalInfo.classList.contains('visible');

            // Закрыть все остальные карточки
            learnMoreButtons.forEach(otherButton => {
                if (otherButton !== button) {
                    const otherCategory = otherButton.closest('.category');
                    const otherAdditionalInfo = otherCategory.querySelector('.additional-info');
                    otherAdditionalInfo.classList.remove('visible');
                    otherButton.textContent = 'Learn More';
                }
            });

            // Переключить видимость информации в текущей карточке
            additionalInfo.classList.toggle('visible');
            button.textContent = isVisible ? 'Learn More' : 'Show Less';

            if (!isVisible) {
                setTimeout(() => {
                    additionalInfo.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 300);
            }
        });
    });

    document.querySelectorAll('.category').forEach((category, index) => {
        category.style.setProperty('--order', index);
    });

    toggleSwitch.addEventListener('change', toggleTheme, false);

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const yOffset = -80; // Учитываем высоту навбара
                const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({top: y, behavior: 'smooth'});
            }
        });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.backgroundColor = 'rgba(26, 0, 51, 0.9)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.backgroundColor = 'transparent';
            navbar.style.boxShadow = 'none';
        }
    });
});

function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.body.className = themeName;
}

function toggleTheme() {
    if (localStorage.getItem('theme') === 'dark-theme') {
        setTheme('light-theme');
    } else {
        setTheme('dark-theme');
    }
}

(function () {
    if (localStorage.getItem('theme') === 'dark-theme') {
        setTheme('dark-theme');
        document.getElementById('checkbox').checked = true;
    } else {
        setTheme('light-theme');
    }
})();

const showFormButton = document.getElementById('showFormButton');
const modalOverlay = document.getElementById('modalOverlay');
const closeModal = document.querySelector('.close-modal');
const applicationForm = document.getElementById('applicationForm');

function toggleScrollLock() {
    document.body.classList.toggle('scroll-lock');
}

showFormButton.addEventListener('click', () => {
    modalOverlay.classList.add('visible');
    toggleScrollLock();
});

closeModal.addEventListener('click', () => {
    modalOverlay.classList.remove('visible');
    toggleScrollLock();
});

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.classList.remove('visible');
        toggleScrollLock();
    }
});

applicationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(applicationForm);
    const data = Object.fromEntries(formData);
    
    // Здесь будет код для отправки данных в Google Таблицу
    console.log('Form data:', data);
    
    // Очистка формы и закрытие модального окна
    applicationForm.reset();
    modalOverlay.classList.remove('visible');
    toggleScrollLock();
    
    // Показываем всплывающее уведомление
    showToast('Your application has been submitted successfully!');
});

function showToast(message) {
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('visible');
    }, 100);
    
    setTimeout(() => {
        toast.classList.remove('visible');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

const applyNowButton = document.getElementById('applyNowButton');

applyNowButton.addEventListener('click', () => {
    modalOverlay.classList.add('visible');
    toggleScrollLock();
});

