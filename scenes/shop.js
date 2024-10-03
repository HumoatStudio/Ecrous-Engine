let coins = 0;
const coinCounter = document.getElementById("coinCounter");
const promoButton = document.getElementById("promoButton");
const promoModal = document.getElementById("promoModal");
const closeModal = promoModal.querySelector(".close");
const promoInput = document.getElementById("promoInput");
const submitPromo = document.getElementById("submitPromo");

// Проверка сохранённых монет при загрузке страницы
window.onload = function() {
    const savedCoins = localStorage.getItem("coins");
    if (savedCoins) {
        coins = parseInt(savedCoins);
        coinCounter.textContent = coins;
    }
    // Проверка использованных промокодов
    checkUsedPromoCodes();
}

// Открытие модального окна
promoButton.onclick = function() {
    promoModal.style.display = "flex";
}

// Закрытие модального окна
closeModal.onclick = function() {
    promoModal.style.display = "none";
}

// Применение промокода
submitPromo.onclick = function() {
    const promoCode = promoInput.value.trim().toUpperCase(); // Приводим к верхнему регистру
    let reward = 0;

    // Проверка промокода
    switch (promoCode) {
        case "PROMO10":
            reward = 10;
            break;
        case "FREEMONEY":
            reward = 50;
            break;
        case "STARTUP":
            reward = 100;
            break;
        case "DEVBOOST":
            reward = 200;
            break;
        case "LEVELUP":
            reward = 150;
            break;
        case "NEWYEAR2024":
            reward = 300;
            break;
        case "DISCOUNT20":
            alert("Вы получили 20% скидку на внутриигровые покупки!");
            break;
        case "EXTRAGOLD":
            reward = 75;
            break;
        case "DOUBLEUP":
            alert("Вы получите двойное количество монет за первую покупку!");
            break;
        case "VIPACCESS":
            reward = 500;
            alert("Вы получили доступ к эксклюзивному контенту!");
            break;
        default:
            alert("Неверный промокод!");
            promoInput.value = ''; // Очищаем поле ввода
            return;
    }

    // Проверка на одноразовое использование
    const usedPromoCodes = JSON.parse(localStorage.getItem("usedPromoCodes")) || [];
    if (usedPromoCodes.includes(promoCode)) {
        alert("Этот промокод уже был использован на этом устройстве!");
    } else {
        // Обновление счётчика монет
        coins += reward;
        coinCounter.textContent = coins;
        localStorage.setItem("coins", coins); // Сохранение монет
        usedPromoCodes.push(promoCode); // Добавление в использованные
        localStorage.setItem("usedPromoCodes", JSON.stringify(usedPromoCodes)); // Сохранение использованных промокодов
        alert(`Вы получили ${reward} монет!`);
    }

    promoInput.value = ''; // Очищаем поле ввода
    promoModal.style.display = "none"; // Закрываем модальное окно
}

// Проверка использованных промокодов
function checkUsedPromoCodes() {
    const usedPromoCodes = JSON.parse(localStorage.getItem("usedPromoCodes")) || [];
    console.log("Использованные промокоды:", usedPromoCodes);
}