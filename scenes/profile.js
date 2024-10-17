// Получаем элементы из DOM
const circle = document.querySelector('.circle');
const usernameDisplay = document.querySelector('.username');
const changeNameButton = document.querySelector('.change-name-button');
const nameInput = document.querySelector('.name-input');
const subscribeButton = document.querySelector('.subscribe-button');
const modal = document.querySelector('.modal');
const closeModalButton = document.querySelector('.close');
const activationMessage = document.getElementById('activationMessage'); // Сообщение о подписке

// Функция для генерации случайного ника
function generateRandomNickname() {
    const nicknames = ['User123', '777', 'CoolCat', 'Guest228', 'Ecrous Engine'];
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
    displaySubscriptionStatus(); // Проверяем и отображаем статус подписки
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

    checkSubscriptionValidity(); // Проверяем, не истекла ли подписка
};

// Функция для обновления монет (например, после применения промокода)
function updateCoinCounter(amount) {
    coins += amount;
    coinCounter.textContent = coins; // Обновление отображения монет
    localStorage.setItem("coins", coins); // Сохранение монет
}

const activateButton = document.getElementById('activateButton');
const activationCodeInput = document.getElementById('activationCode');

// Массив с кодами активации
const activationCodes = [
    "XXXX-DDDH-HDME-MODR",
    "DTTP-HTSS-DSSS-BDR3",
    // ...добавь сюда остальные коды...
];

// Функция для проверки валидности подписки
function checkSubscriptionValidity() {
    const subscriptionDate = localStorage.getItem('subscriptionDate');
    if (subscriptionDate) {
        const currentDate = new Date();
        const savedDate = new Date(subscriptionDate);
        const timeDiff = currentDate - savedDate;
        const daysDiff = timeDiff / (1000 * 60 * 60 * 24);

        // Если прошло более 30 дней с момента активации подписки, она истекает
        if (daysDiff > 30) {
            localStorage.removeItem('isSubscribed');
            localStorage.removeItem('subscriptionDate');
            activationMessage.textContent = "Подписка истекла."; // Отображаем сообщение об истечении подписки
        }
    }
}

// Функция для сохранения подписки и даты активации
function saveSubscription() {
    localStorage.setItem('isSubscribed', 'true');
    localStorage.setItem('subscriptionDate', new Date().toISOString()); // Сохраняем дату активации
}

// Функция для отображения статуса подписки
function displaySubscriptionStatus() {
    if (localStorage.getItem('isSubscribed')) {
        activationMessage.textContent = "Подписка активирована."; // Отображаем сообщение, если подписка активна
    } else {
        activationMessage.textContent = "Подписка не активирована."; // Сообщение, если подписка не активна
    }
}

// Обработчик события на кнопку активации
activateButton.addEventListener('click', () => {
    const inputCode = activationCodeInput.value.trim(); // Получаем код из поля ввода

    if (localStorage.getItem('isSubscribed')) {
        activationMessage.textContent = "Подписка уже активирована!"; // Сообщение, если подписка уже активирована
    } else if (activationCodes.includes(inputCode)) {
        saveSubscription(); // Сохраняем подписку
        activationMessage.textContent = "Подписка активирована!"; // Сообщение об успешной активации
        activationCodeInput.value = ''; // Очищаем поле ввода
        modal.style.display = 'none'; // Закрываем модальное окно
    } else {
        activationMessage.textContent = "Неверный код активации!"; // Сообщение об ошибке
    }
});
