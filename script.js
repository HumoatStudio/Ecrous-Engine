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

    // Проверяем, если это первый визит
    const firstVisit = localStorage.getItem('firstVisit');
    if (!firstVisit) {
        showWelcomeMessage(); // Показываем сообщение для новичков
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



// Загружаем тему и язык из localStorage при загрузке страницы
window.onload = function() {
    const savedSettings = JSON.parse(localStorage.getItem('gameEngineSettings'));
    if (savedSettings) {
        applyTheme(savedSettings.uiTheme || 'dark');
        applyLanguage(savedSettings.language || 'ru'); // По умолчанию русский язык
    }

    // Проверяем, если это первый визит
    const firstVisit = localStorage.getItem('firstVisit');
    if (!firstVisit) {
        showWelcomeMessage(); // Показываем сообщение для новичков
    }
};

// Функция для применения языка
function applyLanguage(language) {
    if (language === 'en') {
        document.title = 'Menu';
        document.querySelector('.title').textContent = 'Ecrous Engine';
        document.querySelector('.menu-button:nth-child(1)').textContent = 'My Projects';
        document.querySelector('.menu-button:nth-child(2)').textContent = 'Shop';
        document.querySelector('.menu-button:nth-child(3)').textContent = 'Profile';
        document.querySelector('.menu-button:nth-child(4)').textContent = 'Settings';
        document.querySelector('.menu-button:nth-child(5)').textContent = 'Thanks';
    } else if (language === 'uk') {
        document.title = 'Меню';
        document.querySelector('.title').textContent = 'Ecrous Engine';
        document.querySelector('.menu-button:nth-child(1)').textContent = 'Мої проєкти';
        document.querySelector('.menu-button:nth-child(2)').textContent = 'Магазин';
        document.querySelector('.menu-button:nth-child(3)').textContent = 'Профіль';
        document.querySelector('.menu-button:nth-child(4)').textContent = 'Налаштування';
        document.querySelector('.menu-button:nth-child(5)').textContent = 'Подяки';
    } else if (language === 'kz') {
        document.title = 'Мәзір';
        document.querySelector('.title').textContent = 'Ecrous Engine';
        document.querySelector('.menu-button:nth-child(1)').textContent = 'Менің жобаларым';
        document.querySelector('.menu-button:nth-child(2)').textContent = 'Дүкен';
        document.querySelector('.menu-button:nth-child(3)').textContent = 'Профиль';
        document.querySelector('.menu-button:nth-child(4)').textContent = 'Баптаулар';
        document.querySelector('.menu-button:nth-child(5)').textContent = 'Рақмет';
    } else if (language === 'pl') {
        document.title = 'Menu';
        document.querySelector('.title').textContent = 'Ecrous Engine';
        document.querySelector('.menu-button:nth-child(1)').textContent = 'Moje Projekty';
        document.querySelector('.menu-button:nth-child(2)').textContent = 'Sklep';
        document.querySelector('.menu-button:nth-child(3)').textContent = 'Profil';
        document.querySelector('.menu-button:nth-child(4)').textContent = 'Ustawienia';
        document.querySelector('.menu-button:nth-child(5)').textContent = 'Podziękowania';
    } else if (language === 'pt-br') {
        document.title = 'Menu';
        document.querySelector('.title').textContent = 'Ecrous Engine';
        document.querySelector('.menu-button:nth-child(1)').textContent = 'Meus Projetos';
        document.querySelector('.menu-button:nth-child(2)').textContent = 'Loja';
        document.querySelector('.menu-button:nth-child(3)').textContent = 'Perfil';
        document.querySelector('.menu-button:nth-child(4)').textContent = 'Configurações';
        document.querySelector('.menu-button:nth-child(5)').textContent = 'Agradecimentos';
    } else if (language === 'ko') {
        document.title = '메뉴';
        document.querySelector('.title').textContent = 'Ecrous Engine';
        document.querySelector('.menu-button:nth-child(1)').textContent = '내 프로젝트';
        document.querySelector('.menu-button:nth-child(2)').textContent = '상점';
        document.querySelector('.menu-button:nth-child(3)').textContent = '프로필';
        document.querySelector('.menu-button:nth-child(4)').textContent = '설정';
        document.querySelector('.menu-button:nth-child(5)').textContent = '감사합니다';
    } else if (language === 'zh') {
        document.title = '菜单';
        document.querySelector('.title').textContent = 'Ecrous Engine';
        document.querySelector('.menu-button:nth-child(1)').textContent = '我的项目';
        document.querySelector('.menu-button:nth-child(2)').textContent = '商店';
        document.querySelector('.menu-button:nth-child(3)').textContent = '个人资料';
        document.querySelector('.menu-button:nth-child(4)').textContent = '设置';
        document.querySelector('.menu-button:nth-child(5)').textContent = '感谢';
    } else if (language === 'de') {
        document.title = 'Menü';
        document.querySelector('.title').textContent = 'Ecrous Engine';
        document.querySelector('.menu-button:nth-child(1)').textContent = 'Meine Projekte';
        document.querySelector('.menu-button:nth-child(2)').textContent = 'Shop';
        document.querySelector('.menu-button:nth-child(3)').textContent = 'Profil';
        document.querySelector('.menu-button:nth-child(4)').textContent = 'Einstellungen';
        document.querySelector('.menu-button:nth-child(5)').textContent = 'Dankeschön';
    } else {
        // Русский по умолчанию
        document.title = 'Меню';
        document.querySelector('.title').textContent = 'Ecrous Engine';
        document.querySelector('.menu-button:nth-child(1)').textContent = 'Мои Проекты';
        document.querySelector('.menu-button:nth-child(2)').textContent = 'Магазин';
        document.querySelector('.menu-button:nth-child(3)').textContent = 'Профиль';
        document.querySelector('.menu-button:nth-child(4)').textContent = 'Настройки';
        document.querySelector('.menu-button:nth-child(5)').textContent = 'Благодарности';
    }
}


// Загружаем тему и язык из localStorage при загрузке страницы
window.onload = function() {
    const savedSettings = JSON.parse(localStorage.getItem('gameEngineSettings'));
    if (savedSettings) {
        applyTheme(savedSettings.uiTheme || 'dark');
        applyLanguage(savedSettings.language || 'ru'); // По умолчанию русский язык
    }

    // Проверяем, если это первый визит
    const firstVisit = localStorage.getItem('firstVisit');
    if (!firstVisit) {
        showWelcomeMessage(); // Показываем сообщение для новичков
    }
};

// Функция для показа приветственного сообщения
function showWelcomeMessage() {
    const welcomeMessage = document.createElement('div');
    welcomeMessage.className = 'welcome-message';
    welcomeMessage.innerHTML = `
        <div class="welcome-content">
            <p>Добро пожаловать в Ecrous Engine! Мы рады вас видеть!</p>
            <p>Ecrous Engine - это движок для создания игр, приложений.</p>
            <p>Здесь собран весь удобный функционал. Удачи!</p>
            <button id="closeWelcomeButton">Окей</button>
        </div>
    `;

    document.body.appendChild(welcomeMessage);

    // Закрытие сообщения при нажатии на кнопку
    document.getElementById('closeWelcomeButton').addEventListener('click', function() {
        document.body.removeChild(welcomeMessage);
        localStorage.setItem('firstVisit', 'true'); // Устанавливаем, что сообщение было показано
    });
}


// Функция для показа приветственного сообщения
function showWelcomeMessage() {
    const welcomeMessage = document.createElement('div');
    welcomeMessage.className = 'welcome-message';
    welcomeMessage.innerHTML = `
        <div class="welcome-content">
            <p>Добро пожаловать в Ecrous Engine! Мы рады вас видеть!</p>
            <p>Ecrous Engine - это движок</p>
            <p>Для создания игр, приложений, здесь</p>
            <p>Собран весь удобный</p>
            <p>Функционал. Удачи!</p>
            <button id="closeWelcomeButton">Окей</button>
        </div>
    `;

    document.body.appendChild(welcomeMessage);

    // Закрытие сообщения при нажатии на кнопку
    document.getElementById('closeWelcomeButton').addEventListener('click', function() {
        document.body.removeChild(welcomeMessage);
        localStorage.setItem('firstVisit', 'true'); // Устанавливаем, что сообщение было показано
    });
}
