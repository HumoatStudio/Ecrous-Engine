// Функция для отображения таблички
function showTooltip(buttonId, tooltipId) {
    const button = document.getElementById(buttonId);
    const tooltip = document.getElementById(tooltipId);

    button.addEventListener('click', function() {
        tooltip.classList.add('show');  // Показать табличку
        setTimeout(function() {
            tooltip.classList.remove('show');  // Скрыть табличку через 3 секунды
        }, 3000);
    });
}

// Применение функции для каждой кнопки
showTooltip('ipa-btn', 'ipa-tooltip');
showTooltip('exe-btn', 'exe-tooltip');
showTooltip('tv-btn', 'tv-tooltip');