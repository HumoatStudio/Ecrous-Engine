// Найти иконку и текст
const starIcon = document.getElementById('star-icon');
const starText = document.getElementById('star-text');

// Добавить обработчик события на иконку
starIcon.addEventListener('click', function() {
    // Показать или скрыть текст
    if (starText.classList.contains('show')) {
        starText.classList.remove('show');
    } else {
        starText.classList.add('show');
    }
});