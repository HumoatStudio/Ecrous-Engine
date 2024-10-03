// Получаем элементы из DOM
const circle = document.querySelector('.circle');
const usernameDisplay = document.querySelector('.username');
const changeNameButton = document.querySelector('.change-name-button');
const nameInput = document.querySelector('.name-input');
const subscribeButton = document.querySelector('.subscribe-button');
const modal = document.querySelector('.modal');
const closeModalButton = document.querySelector('.close');

// Функция для генерации случайного ника
function generateRandomNickname() {
    const nicknames = ['User123', 'GamerBoy', 'CoolCat', 'StarPlayer', 'EpicGamer'];
    return nicknames[Math.floor(Math.random() * nicknames.length)];
}

// Функция для загрузки имени пользователя из localStorage или генерации случайного
function loadUsername() {
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
        return savedUsername; // Возвращаем сохраненное имя, если оно есть
    } else {
        const randomUsername = generateRandomNickname();
        localStorage.setItem('username', randomUsername); // Сохраняем случайный ник
        return randomUsername;
    }
}

// Функция для сохранения имени пользователя
function saveUsername(username) {
    localStorage.setItem('username', username);
}

// Установка имени пользователя при загрузке страницы
let currentNickname = loadUsername();
usernameDisplay.innerText = currentNickname;

// Функция для загрузки изображения из localStorage
function loadCircleImage() {
    const savedImage = localStorage.getItem('circleImage');
    if (savedImage) {
        circle.style.backgroundImage = `url(${savedImage})`;
        circle.style.backgroundSize = 'cover';
    } else {
        circle.style.backgroundImage = 'url("../sprites/app.png")'; // Устанавливаем начальное изображение
        circle.style.backgroundSize = 'cover';
    }
}

// Функция для сохранения изображения круга в localStorage
function saveCircleImage(imageData) {
    localStorage.setItem('circleImage', imageData);
}

// Загрузка изображения пользователя
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
            circle.style.backgroundSize = 'cover';
            saveCircleImage(imageData); // Сохраняем изображение в localStorage
        };
        
        if (file) {
            reader.readAsDataURL(file);
        }
    };
    
    input.click(); // Открываем файловый менеджер
}

// Обработчик события на круг (загрузка изображения)
circle.addEventListener('click', loadImage);

// Обработчик события на кнопку смены имени
changeNameButton.addEventListener('click', () => {
    nameInput.style.display = 'block'; // Показываем поле для ввода имени
    nameInput.focus(); // Устанавливаем фокус на поле
});

// Обработчик события на поле ввода имени
nameInput.addEventListener('keypress', event => {
    if (event.key === 'Enter') {
        currentNickname = nameInput.value || currentNickname; // Обновляем ник, если поле не пустое
        usernameDisplay.innerText = currentNickname; // Обновляем отображаемое имя
        saveUsername(currentNickname); // Сохраняем новое имя
        nameInput.value = ''; // Очищаем поле ввода
        nameInput.style.display = 'none'; // Скрываем поле
    }
});

// Обработчик события на кнопку подписки
subscribeButton.addEventListener('click', () => {
    modal.style.display = 'flex'; // Показываем модальное окно
});

// Обработчик события на закрытие модального окна
closeModalButton.addEventListener('click', () => {
    modal.style.display = 'none'; // Скрываем модальное окно
});

// Закрываем модальное окно при клике вне его
window.onclick = event => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

// Загрузка данных при открытии страницы
document.addEventListener('DOMContentLoaded', () => {
    currentNickname = loadUsername(); // Загрузим сохраненное или случайное имя
    usernameDisplay.innerText = currentNickname; // Отображаем имя
    loadCircleImage(); // Загрузка иконки
});

let coins = 0;
const coinCounter = document.getElementById("coinCounter");

// Проверка сохранённых монет при загрузке страницы
window.onload = function() {
    const savedCoins = localStorage.getItem("coins");
    if (savedCoins) {
        coins = parseInt(savedCoins);
        coinCounter.textContent = coins; // Обновление отображения монет
    }
};

// Функция для обновления монет (например, после применения промокода)
function updateCoinCounter(amount) {
    coins += amount;
    coinCounter.textContent = coins; // Обновление отображения монет
    localStorage.setItem("coins", coins); // Сохранение монет
}
