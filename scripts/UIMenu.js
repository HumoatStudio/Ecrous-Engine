// UIMenu

document.addEventListener('keydown', function(event) {
    if (event.shiftKey && event.code === 'KeyU') {
        toggleUIMenu();
    }
});

function toggleUIMenu() {
    const UIMenuPanel = document.getElementById('UIMenuPanel');
    if (UIMenuPanel.style.display === 'flex') {
        closeUIMenu();
    } else {
        openUIMenu();
    }
}

function openUIMenu() {
    const UIMenuPanel = document.getElementById('UIMenuPanel');
    UIMenuPanel.style.display = 'flex'; // Показываем панель
}

function closeUIMenu() {
    const UIMenuPanel = document.getElementById('UIMenuPanel');
    UIMenuPanel.style.display = 'none'; // Скрываем панель
}
