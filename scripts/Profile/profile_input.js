//ProfileInput

// Открытие/закрытие панели ввода профиля
function openProfileInput() {
    document.getElementById('ProfileInputPanel').style.display = 'flex';
}

function closeProfileInput() {
    document.getElementById('ProfileInputPanel').style.display = 'none';
}

// Получаем элементы из DOM
const circle = document.querySelector('.circle');
const usernameDisplay = document.querySelector('.username');
const usernameInput = document.querySelector('.styled-input-prof'); // Поле ввода
const saveUsernameButton = document.querySelector('.save-username-btn'); // Кнопка сохранения

// Функция генерации случайного ника
function generateRandomNickname() {
    return `User${Math.floor(Math.random() * (9999 - 1111 + 1)) + 1111}`;
}

// Функция загрузки имени пользователя
function loadUsername() {
    let savedUsername = localStorage.getItem('username');
    if (!savedUsername) {
        savedUsername = generateRandomNickname();
        localStorage.setItem('username', savedUsername);
    }
    return savedUsername;
}

// Функция сохранения имени пользователя
function saveUsername() {
    const newUsername = usernameInput.value.trim();
    if (newUsername) {
        localStorage.setItem('username', newUsername);
        usernameDisplay.innerText = newUsername;
        closeProfileInput(); // Закрываем панель после сохранения
    }
}

// Функция загрузки изображения из localStorage
function loadCircleImage() {
    const savedImage = localStorage.getItem('circleImage');
    if (savedImage) {
        circle.style.backgroundImage = `url(${savedImage})`;
    } else {
        circle.style.backgroundImage = 'url("sprites/app.png")';
    }
    circle.style.backgroundSize = 'cover';
}

// Функция сохранения изображения круга
function saveCircleImage(imageData) {
    localStorage.setItem('circleImage', imageData);
}

// Функция загрузки изображения
function loadImage() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = event => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = e => {
            const imageData = e.target.result;
            circle.style.backgroundImage = `url(${imageData})`;
            saveCircleImage(imageData);
        };

        if (file) reader.readAsDataURL(file);
    };

    input.click();
}

// Назначаем обработчик клика на круг
circle.addEventListener('click', loadImage);

// Назначаем обработчик для кнопки сохранения имени
saveUsernameButton.addEventListener('click', saveUsername);

// Загружаем данные при открытии страницы
document.addEventListener('DOMContentLoaded', () => {
    const currentUsername = loadUsername();
    usernameDisplay.innerText = currentUsername; // Отображаем имя
    usernameInput.value = currentUsername; // Подставляем текущее имя в поле ввода
    loadCircleImage(); // Загружаем картинку
});

