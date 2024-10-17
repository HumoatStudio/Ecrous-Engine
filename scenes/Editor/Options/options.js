// Функция для обновления изображения ориентации в зависимости от выбранного значения
function updateImage() {
    const orientationSelect = document.getElementById('orientation');
    const orientationImg = document.getElementById('orientation-img');

    switch (orientationSelect.value) {
        case 'portrait':
            orientationImg.src = 'Icons/Portail.png';
            break;
        case 'landscape':
            orientationImg.src = 'Icons/Landscape.png';
            break;
        case 'all':
            orientationImg.src = 'Icons/AllOrientations.png';
            break;
        default:
            orientationImg.src = 'Icons/Default.png';
            break;
    }

    // Автоматическое сохранение при изменении ориентации
    saveSettings();
}

// Функция для загрузки иконки проекта и отображения её в превью
function loadIcon(event) {
    const iconPreview = document.getElementById('icon-img');
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            iconPreview.src = e.target.result;
        };

        reader.readAsDataURL(file);
    }

    // Автоматическое сохранение при загрузке новой иконки
    saveSettings();
}

// Функция для сохранения настроек проекта в localStorage
function saveSettings() {
    const versionNumber = document.getElementById('version-number').value;
    const versionName = document.getElementById('version-name').value;
    const packageName = document.getElementById('package-name').value;
    const orientation = document.getElementById('orientation').value;

    const settings = {
        versionNumber,
        versionName,
        packageName,
        orientation
    };

    // Сохраняем объект настроек в localStorage
    localStorage.setItem('projectSettings', JSON.stringify(settings));
}

// Функция для загрузки сохранённых настроек из localStorage
function loadSettings() {
    const savedSettings = localStorage.getItem('projectSettings');

    if (savedSettings) {
        const settings = JSON.parse(savedSettings);

        document.getElementById('version-number').value = settings.versionNumber;
        document.getElementById('version-name').value = settings.versionName;
        document.getElementById('package-name').value = settings.packageName;
        document.getElementById('orientation').value = settings.orientation;

        // Обновляем изображение ориентации
        updateImage();
    }
}

// Добавляем обработчики событий для автоматического сохранения при изменении полей
window.onload = function() {
    loadSettings();

    document.getElementById('version-number').addEventListener('input', saveSettings);
    document.getElementById('version-name').addEventListener('input', saveSettings);
    document.getElementById('package-name').addEventListener('input', saveSettings);
    document.getElementById('orientation').addEventListener('change', updateImage);  // updateImage автоматически вызывает saveSettings
    document.getElementById('icon-input').addEventListener('change', loadIcon);  // Загрузка иконки автоматически вызывает saveSettings
};