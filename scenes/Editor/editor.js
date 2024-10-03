document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const projectName = params.get('project');

    if (projectName) {
        console.log('Открыт проект:', projectName);
        // Здесь добавьте код для загрузки проекта по его названию
    } else {
        console.log('Проект не найден');
    }
});