// Блокировка комбинаций клавиш, включая Ctrl+U
document.addEventListener("keydown", function (event) {
    if (
        event.key === "F12" || // F12
        (event.ctrlKey && event.shiftKey && event.key === "I") || // Ctrl+Shift+I
        (event.ctrlKey && event.shiftKey && event.key === "J") || // Ctrl+Shift+J
        (event.ctrlKey && event.shiftKey && event.key === "C") || // Ctrl+Shift+C
        (event.ctrlKey && event.key === "U") // Ctrl+U
    ) {
        event.preventDefault(); // Останавливаем стандартное действие
        alert("Просмотр исходного кода запрещен!");
    }
});

// Блокировка клика правой кнопкой мыши (контекстного меню)
document.addEventListener("contextmenu", function (event) {
    event.preventDefault();
    alert("Контекстное меню отключено!");
});

// Функция для перехода на другую страницу
function openPage(pageUrl) {
    window.location.href = pageUrl;
}

window.addEventListener('load', function () {
    const loader = document.getElementById('loader');
    if (!loader) return; // Проверка, есть ли элемент

    // Скрываем загрузочный экран через 5 секунд
    setTimeout(() => {
        loader.style.animation = 'fadeOutLoader 1s forwards'; // Запускаем анимацию

        // Удаляем из DOM после завершения анимации
        setTimeout(() => loader.remove(), 1000);
    }, 5000);
});

// Скрываем модальные окна при старте
window.onload = function() {
    var modal = document.getElementById("myModal"); // Модальное окно
    var modalNews = document.getElementById("myModalNews"); // Модальное окно новостей

    if (modal) modal.style.display = "none"; // Скрываем модальное окно при старте
    if (modalNews) modalNews.style.display = "none"; // Скрываем модальное окно новостей при старте
};