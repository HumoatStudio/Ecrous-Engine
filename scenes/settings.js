// Функция для сохранения настроек
function saveSettings() {
    const settings = {
        filePath: document.getElementById('file-path').value,
        gravity: document.getElementById('gravity').value,
        uiTheme: document.getElementById('ui-theme').value,
        language: document.getElementById('language').value,
        backgroundImage: localStorage.getItem('backgroundImage') // Сохраняем фон, если он загружен
    };
    localStorage.setItem('gameEngineSettings', JSON.stringify(settings));
}

// Загружаем настройки при загрузке страницы
window.onload = function() {
    const savedSettings = JSON.parse(localStorage.getItem('gameEngineSettings'));
    if (savedSettings) {
        document.getElementById('file-path').value = savedSettings.filePath || '/storage/emulated/0/Download/';
        document.getElementById('gravity').value = savedSettings.gravity || '9.81';
        document.getElementById('ui-theme').value = savedSettings.uiTheme || 'dark';
        document.getElementById('language').value = savedSettings.language || 'ru';

        // Применение темы
        applyTheme(savedSettings.uiTheme || 'dark');
        // Применение языка
        applyLanguage(savedSettings.language || 'ru');

        // Применение фонового изображения, если оно есть
        if (savedSettings.backgroundImage) {
            document.body.style.backgroundImage = `url(${savedSettings.backgroundImage})`;
        }
    }
    saveSettings(); // Автосохранение при загрузке
};

// Обработчик для автосохранения
document.querySelectorAll('.setting select, .setting input').forEach(element => {
    element.addEventListener('change', saveSettings);
});

// Обработчик для смены языка
document.getElementById('language').addEventListener('change', function() {
    const language = this.value;
    applyLanguage(language);
    saveSettings(); // Сохранение при смене языка
});

// Функция для применения языка
function applyLanguage(language) {
    if (language === 'en') {
        document.title = 'Settings';
        document.querySelector('.title').textContent = 'Settings';
        document.querySelector('label[for="file-path"]').textContent = 'File Path:';
        document.querySelector('label[for="gravity"]').textContent = 'Gravity:';
        document.querySelector('label[for="ui-theme"]').textContent = 'UI Theme:';
        document.querySelector('label[for="language"]').textContent = 'Language:';
        document.querySelector('label[for="background-upload"]').textContent = 'Upload Background:';
    } else if (language === 'uk') {
        document.title = 'Налаштування';
        document.querySelector('.title').textContent = 'Налаштування';
        document.querySelector('label[for="file-path"]').textContent = 'Шлях до файлів:';
        document.querySelector('label[for="gravity"]').textContent = 'Гравітація:';
        document.querySelector('label[for="ui-theme"]').textContent = 'Тема інтерфейсу:';
        document.querySelector('label[for="language"]').textContent = 'Мова:';
        document.querySelector('label[for="background-upload"]').textContent = 'Завантажити фон:';
    } else if (language === 'kz') {
        document.title = 'Параметрлер';
        document.querySelector('.title').textContent = 'Параметрлер';
        document.querySelector('label[for="file-path"]').textContent = 'Файл жолы:';
        document.querySelector('label[for="gravity"]').textContent = 'Гравитация:';
        document.querySelector('label[for="ui-theme"]').textContent = 'Интерфейс тақырыбы:';
        document.querySelector('label[for="language"]').textContent = 'Тіл:';
        document.querySelector('label[for="background-upload"]').textContent = 'Фонды жүктеу:';
    } else if (language === 'by') {
        document.title = 'Налады';
        document.querySelector('.title').textContent = 'Налады';
        document.querySelector('label[for="file-path"]').textContent = 'Шлях да файлаў:';
        document.querySelector('label[for="gravity"]').textContent = 'Гравітацыя:';
        document.querySelector('label[for="ui-theme"]').textContent = 'Тэма інтэрфейсу:';
        document.querySelector('label[for="language"]').textContent = 'Мова:';
        document.querySelector('label[for="background-upload"]').textContent = 'Загрузіць фон:';
    } else if (language === 'pl') {
        document.title = 'Ustawienia';
        document.querySelector('.title').textContent = 'Ustawienia';
        document.querySelector('label[for="file-path"]').textContent = 'Ścieżka do plików:';
        document.querySelector('label[for="gravity"]').textContent = 'Grawitacja:';
        document.querySelector('label[for="ui-theme"]').textContent = 'Motyw interfejsu:';
        document.querySelector('label[for="language"]').textContent = 'Język:';
        document.querySelector('label[for="background-upload"]').textContent = 'Załaduj tło:';
    } else if (language === 'pt-br') {
        document.title = 'Configurações';
        document.querySelector('.title').textContent = 'Configurações';
        document.querySelector('label[for="file-path"]').textContent = 'Caminho do arquivo:';
        document.querySelector('label[for="gravity"]').textContent = 'Gravidade:';
        document.querySelector('label[for="ui-theme"]').textContent = 'Tema da interface:';
        document.querySelector('label[for="language"]').textContent = 'Idioma:';
        document.querySelector('label[for="background-upload"]').textContent = 'Carregar Fundo:';
    } else if (language === 'ko') {
        document.title = '설정';
        document.querySelector('.title').textContent = '설정';
        document.querySelector('label[for="file-path"]').textContent = '파일 경로:';
        document.querySelector('label[for="gravity"]').textContent = '중력:';
        document.querySelector('label[for="ui-theme"]').textContent = '인터페이스 테마:';
        document.querySelector('label[for="language"]').textContent = '언어:';
        document.querySelector('label[for="background-upload"]').textContent = '배경 업로드:';
    } else if (language === 'zh') {
        document.title = '设置';
        document.querySelector('.title').textContent = '设置';
        document.querySelector('label[for="file-path"]').textContent = '文件路径:';
        document.querySelector('label[for="gravity"]').textContent = '重力:';
        document.querySelector('label[for="ui-theme"]').textContent = '界面主题:';
        document.querySelector('label[for="language"]').textContent = '语言:';
        document.querySelector('label[for="background-upload"]').textContent = '上传背景:';
    } else if (language === 'de') {
        document.title = 'Einstellungen';
        document.querySelector('.title').textContent = 'Einstellungen';
        document.querySelector('label[for="file-path"]').textContent = 'Dateipfad:';
        document.querySelector('label[for="gravity"]').textContent = 'Schwerkraft:';
        document.querySelector('label[for="ui-theme"]').textContent = 'Benutzeroberflächen-Thema:';
        document.querySelector('label[for="language"]').textContent = 'Sprache:';
        document.querySelector('label[for="background-upload"]').textContent = 'Hintergrund hochladen:';
    } else {
        // По умолчанию русский язык
        document.title = 'Настройки';
        document.querySelector('.title').textContent = 'Настройки';
        document.querySelector('label[for="file-path"]').textContent = 'Путь к файлам:';
        document.querySelector('label[for="gravity"]').textContent = 'Гравитация:';
        document.querySelector('label[for="ui-theme"]').textContent = 'Тема интерфейса:';
        document.querySelector('label[for="language"]').textContent = 'Язык:';
        document.querySelector('label[for="background-upload"]').textContent = 'Загрузить фон:';
    }
}

// Функция для применения темы
function applyTheme(theme) {
    document.body.style.backgroundImage = theme === 'dark' ? "url('../sprites/bg2.png')" : "url('../sprites/bg2White.png')";
    document.body.style.backgroundSize = 'cover';

    // Меняем цвет текста в зависимости от темы
    document.querySelector('.settings-container').style.color = theme === 'dark' ? 'white' : 'black';
}

// Обработчик для смены темы
document.getElementById('ui-theme').addEventListener('change', function() {
    applyTheme(this.value);
});

// Обработчик для загрузки собственного фона
document.getElementById('background-upload').addEventListener('change', function() {
    const file = this.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const backgroundImage = e.target.result;
        document.body.style.backgroundImage = `url(${backgroundImage})`;
        document.body.style.backgroundSize = 'cover';
        localStorage.setItem('backgroundImage', backgroundImage); // Сохраняем фон в localStorage
        saveSettings(); // Сохраняем все настройки
    };

    if (file) {
        reader.readAsDataURL(file);
    }
});