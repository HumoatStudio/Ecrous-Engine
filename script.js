function openPage(pageUrl) {
    window.location.href = pageUrl;
}

// Функция для применения темы
function applyTheme(theme) {
    document.body.className = ''; // Сброс всех классов темы
    document.body.classList.add(theme); // Добавляем нужный класс

    // Меняем цвет текста в зависимости от темы
    const color = theme === 'dark' || theme === 'contrast' || theme === 'neon' ? 'white' : 'black';
    document.querySelector('.settings-container').style.color = color;
}

// Функция для применения языка
function applyLanguage(language) {
    const titles = {
        en: 'Menu',
        uk: 'Меню',
        kz: 'Мәзір',
        pl: 'Menu',
        'pt-br': 'Menu',
        ko: '메뉴',
        zh: '菜单',
        de: 'Menü',
        ru: 'Меню'
    };

    const texts = {
        en: ['My Projects', 'Community', 'Profile', 'Settings', 'Thanks'],
        uk: ['Мої проєкти', 'Ком юніті', 'Профіль', 'Налаштування', 'Подяки'],
        kz: ['Менің жобаларым', 'Қауымдастық', 'Профиль', 'Баптаулар', 'Рақмет'],
        pl: ['Moje Projekty', 'Wspólnota', 'Profil', 'Ustawienia', 'Podziękowania'],
        'pt-br': ['Meus Projetos', 'Loja', 'Perfil', 'Configurações', 'Agradecimentos'],
        ko: ['내 프로젝트', '상점', '프로필', '설정', '감사합니다'],
        zh: ['我的项目', '商店', '个人资料', '设置', '感谢'],
        de: ['Meine Projekte', 'Shop', 'Profil', 'Einstellungen', 'Dankeschön'],
        ru: ['Мои Проекты', 'Комьюнити', 'Профиль', 'Настройки', 'Благодарности']
    };

    document.title = titles[language] || titles.ru;
    document.querySelector('.title').textContent = 'Ecrous Engine';

    const buttons = document.querySelectorAll('.menu-button');
    buttons.forEach((button, index) => {
        button.textContent = (texts[language] || texts.ru)[index];
    });
}

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

// Загружаем тему и язык из localStorage при загрузке страницы
window.onload = function() {
    const savedSettings = JSON.parse(localStorage.getItem('gameEngineSettings'));
    if (savedSettings) {
        applyTheme(savedSettings.uiTheme || 'dark');
        applyLanguage(savedSettings.language || 'ru'); // По умолчанию русский язык
    }

    // Проверяем, если это первый визит
    if (!localStorage.getItem('firstVisit')) {
        showWelcomeMessage(); // Показываем сообщение для новичков
    }
};
