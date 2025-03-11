// Функция для обновления версии ЯП
function updateVersion(language) {
    const selectElement = document.getElementById(language + 'Select');
    const versionDisplay = document.getElementById(language + 'Version');
    
    // Обновляем текст версии на кнопке в соответствии с выбранной версией
    versionDisplay.textContent = `[${selectElement.value}]`;
}
