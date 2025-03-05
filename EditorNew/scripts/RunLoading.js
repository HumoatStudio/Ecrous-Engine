//RunLoading

function openRunLoading() {
    const RunLoadingPanel = document.getElementById('RunLoadingPanel');
    RunLoadingPanel.style.display = 'flex'; // Показываем панель
    
    // Запускаем таймер на 3 секунды
    setTimeout(() => {
        RunLoadingPanel.style.display = 'none'; // Скрываем панель
        closeRunLoading(); // Вызываем функцию после таймера
    }, 3000);
}

function closeRunLoading() {
    const RunLoadingPanel = document.getElementById('RunLoadingPanel');
    RunLoadingPanel.style.display = 'none'; // Скрываем панель
    openRunMenu()
}
