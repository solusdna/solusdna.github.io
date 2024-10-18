document.addEventListener('DOMContentLoaded', () => {
    const ctaButton = document.querySelector('.cta-button');
    const categoriesSection = document.querySelector('.categories-section');
    const learnMoreButtons = document.querySelectorAll('.learn-more-button');
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    const categoryButtons = document.querySelectorAll('.category-button');
    const baseCPMValue = document.querySelector('.cpm-value');
    const categoryList = document.querySelector('.category-list');

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
                { name: 'Deep Analysis', ratio: 1.5 },
                { name: 'Other/Special', ratio: 'TBD' }
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
        ctaButton.classList.add('hidden');
        setTimeout(() => {
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
