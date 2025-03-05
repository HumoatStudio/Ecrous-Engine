//PromoCodes

function openPromoCodes() {
    const PromoCodesPanel = document.getElementById('PromoCodesPanel');
    PromoCodesPanel.style.display = 'flex'; // Показываем панель
}

function closePromoCodes() {
    const PromoCodesPanel = document.getElementById('PromoCodesPanel');
    PromoCodesPanel.style.display = 'none'; // Скрываем панель
}

// Функция для загрузки монет из localStorage
function loadCoins() {
    return parseInt(localStorage.getItem('coins')) || 0;
}

// Функция для сохранения монет в localStorage
function saveCoins(coins) {
    localStorage.setItem('coins', coins);
}

// Инициализация счётчика
const coinCounter = document.querySelector('.coin-counter');
let coins = loadCoins();
coinCounter.textContent = coins;

// Обработка промокодов
const promoCodes = {
    "4A1EQI6I": 110,
    "XEZA9RQM": 55,
    "UC0Y83IO": 20
};

document.querySelector('.apply-promo').addEventListener('click', () => {
    const promoInput = document.querySelector('.promo-input');
    const promoCode = promoInput.value.trim().toUpperCase();

    if (promoCodes[promoCode]) {
        const bonus = promoCodes[promoCode];
        coins += bonus;
        coinCounter.textContent = coins;
        saveCoins(coins);
        alert(`Промокод применён! Вы получили ${bonus} монет.`);
    } else {
        alert('Неверный или недействительный промокод.');
    }

    promoInput.value = ''; // Очистить поле ввода
});
