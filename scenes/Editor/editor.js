document.addEventListener('DOMContentLoaded', function () {
    const deleteButton = document.querySelector('.button4'); // Кнопка удаления проекта
    const projectName = localStorage.getItem('currentProject'); // Получаем имя текущего проекта

    if (!projectName) {
        alert('Проект не выбран.');
        return; // Если проект не выбран, выходим
    }

    // Ваш код редактора здесь...

    deleteButton.addEventListener('click', () => {
        if (confirm(`Вы уверены, что хотите удалить проект "${projectName}"?`)) {
            deleteProject(projectName);
            window.location.href = '../../Projects/projects.html'; // Перенаправление обратно на список проектов
        }
    });

    function deleteProject(projectName) {
        let projects = JSON.parse(localStorage.getItem('projects')) || [];
        projects = projects.filter(project => project.name !== projectName);
        localStorage.setItem('projects', JSON.stringify(projects));
    }
});