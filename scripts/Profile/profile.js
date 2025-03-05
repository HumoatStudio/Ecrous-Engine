//Profile

function openProfile() {
    const ProfilePanel = document.getElementById('ProfilePanel');
    ProfilePanel.style.display = 'flex'; // Показываем панель
}

function closeProfile() {
    const ProfilePanel = document.getElementById('ProfilePanel');
    ProfilePanel.style.display = 'none'; // Скрываем панель
}

// Функция для форматирования времени (добавление ведущих нулей)
function formatTime(value) {
    return value < 10 ? `0${value}` : value;
}

// Функция для форматирования времени (добавление ведущих нулей)
function formatTime(value) {
    return value < 10 ? `0${value}` : value;
}

// Функция для обновления времени
function updateTime() {
    const now = Date.now();
    const timeDiff = now - startTime;

    // Вычисляем дни, часы, минуты, секунды и миллисекунды
    const milliseconds = Math.floor(timeDiff % 1000);
    const seconds = Math.floor((timeDiff / 1000) % 60);
    const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
    const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    // Обновляем отображение времени
    document.getElementById('days').textContent = formatTime(days);
    document.getElementById('hours').textContent = formatTime(hours);
    document.getElementById('minutes').textContent = formatTime(minutes);
    document.getElementById('seconds').textContent = formatTime(seconds);
    document.getElementById('milliseconds').textContent = formatTime(milliseconds);

    // Сохраняем текущее время в localStorage
    localStorage.setItem('timeSpent', timeDiff);
}

// Инициализация времени
let savedTime = parseInt(localStorage.getItem('timeSpent'));

// Если значение отсутствует или некорректно, начинаем с нуля
if (isNaN(savedTime)) {
    savedTime = 0;
    localStorage.setItem('timeSpent', 0); // Устанавливаем начальное значение
}

let startTime = Date.now() - savedTime;

// Запуск таймера
setInterval(updateTime, 10); // Обновляем время каждые 10 миллисекунд
