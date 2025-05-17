document.addEventListener("keydown", (event) => {
    if (event.key === "F5") {
        event.preventDefault(); // Предотвращаем стандартное обновление страницы
        openRunLoading(); // Запускаем загрузочный экран
    }
});

// Функция для показа панели загрузки
function openRunLoading() {
    const RunLoadingPanel = document.getElementById('RunLoadingPanel');
    if (RunLoadingPanel) {
        RunLoadingPanel.style.display = 'flex'; // Показываем панель
        
        // Запускаем таймер на 3 секунды
        setTimeout(() => {
            RunLoadingPanel.style.display = 'none'; // Скрываем панель
            closeRunLoading(); // Вызываем функцию после таймера
        }, 3000);
    }
}

function closeRunLoading() {
    const RunLoadingPanel = document.getElementById('RunLoadingPanel');
    RunLoadingPanel.style.display = 'none'; // Скрываем панель
    openRunMenu()
}
