function openPage(pageUrl) {
    window.location.href = pageUrl;
}

// Загружаем тему и язык из localStorage при загрузке страницы
window.onload = function() {
    const savedSettings = JSON.parse(localStorage.getItem('gameEngineSettings'));
    if (savedSettings) {
        applyTheme(savedSettings.uiTheme || 'dark');
        applyLanguage(savedSettings.language || 'ru');
    }
};

// Функция для применения темы
function applyTheme(theme) {
    const body = document.body;
    if (theme === 'dark') {
        body.classList.add('dark-theme');
        body.classList.remove('light-theme');
    } else {
        body.classList.add('light-theme');
        body.classList.remove('dark-theme');
    }
}

// Функция для применения языка
function applyLanguage(language) {
    if (language === 'en') {
        document.title = 'Menu';
        document.querySelector('.title').textContent = 'Ecrous Engine';
        document.querySelector('.menu-button:nth-child(1)').textContent = 'My Projects';
        document.querySelector('.menu-button:nth-child(2)').textContent = 'Shop';
        document.querySelector('.menu-button:nth-child(3)').textContent = 'Profile';
        document.querySelector('.menu-button:nth-child(4)').textContent = 'Settings';
    } else {
        document.title = 'Меню';
        document.querySelector('.title').textContent = 'Ecrous Engine';
        document.querySelector('.menu-button:nth-child(1)').textContent = 'Мои Проекты';
        document.querySelector('.menu-button:nth-child(2)').textContent = 'Магазин';
        document.querySelector('.menu-button:nth-child(3)').textContent = 'Профиль';
        document.querySelector('.menu-button:nth-child(4)').textContent = 'Настройки';
    }
}