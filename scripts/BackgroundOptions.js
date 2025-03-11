// BackgroundOptions

document.addEventListener('keydown', function(event) {
    if (event.shiftKey && event.code === 'KeyB') {
        document.addEventListener('keydown', function secondKeyPress(e) {
            if (e.code === 'KeyG') {
                toggleBackgroundOptions();
                document.removeEventListener('keydown', secondKeyPress);
            }
        }, { once: true });
    }
});

function toggleBackgroundOptions() {
    const BackgroundOptionsPanel = document.getElementById('BackgroundOptionsPanel');
    if (BackgroundOptionsPanel.style.display === 'flex') {
        closeBackgroundOptions();
    } else {
        openBackgroundOptions();
    }
}

function openBackgroundOptions() {
    const BackgroundOptionsPanel = document.getElementById('BackgroundOptionsPanel');
    BackgroundOptionsPanel.style.display = 'flex'; // Показываем панель
}

function closeBackgroundOptions() {
    const BackgroundOptionsPanel = document.getElementById('BackgroundOptionsPanel');
    BackgroundOptionsPanel.style.display = 'none'; // Скрываем панель
}

const colorPicker = document.getElementById('backgroundColor');
const runMenuPanel = document.getElementById('RunMenuPanel');

// Слушаем событие изменения цвета
colorPicker.addEventListener('input', function () {
    runMenuPanel.style.backgroundColor = colorPicker.value;
});

// Получаем элементы
const urlInput = document.getElementById('backgroundUrl');
const applyButton = document.getElementById('applyBackground');

// Слушаем нажатие кнопки
applyButton.addEventListener('click', function () {
    const imageUrl = urlInput.value; // Получаем URL из поля ввода
    if (imageUrl) {
        runMenuPanel.style.backgroundImage = `url(${imageUrl})`; // Меняем фон объекта
    } else {
        alert('Please enter a valid URL!');
    }
});
