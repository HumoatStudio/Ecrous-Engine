// MyProjects
function openMyProjects() {
    const MyProjectsPanel = document.getElementById('MyProjectsPanel');
    MyProjectsPanel.style.display = 'flex'; // Show the panel
}

function closeMyProjects() {
    const MyProjectsPanel = document.getElementById('MyProjectsPanel');
    MyProjectsPanel.style.display = 'none'; // Hide the panel
}

document.addEventListener('DOMContentLoaded', () => {
    const projectModal = document.getElementById('projectModal');
    const plusButton = document.querySelector('.plus-button'); // Кнопка "Добавить проект"
    const submitProjectButton = document.getElementById('submitProject');
    const projectList = document.getElementById('projectList'); // Список проектов
    const projectNameInput = document.getElementById('projectName');

    let projects = JSON.parse(localStorage.getItem('projects')) || []; // Сохранённые проекты

    // Функция для рендера списка проектов
    function renderProjects() {
        projectList.innerHTML = ''; // Очистить список
        projects.forEach((project, index) => {
            const projectContainer = document.createElement('div');
            projectContainer.classList.add('project-container');

            // Одна иконка для всех проектов
            const projectIcon = document.createElement('img');
            projectIcon.classList.add('project-icon');
            projectIcon.src = 'sprites/PJIcon/IconAndroidProject.svg'; // Единственная иконка
            projectIcon.alt = 'Project Icon';
            projectIcon.style.width = '50px';
            projectIcon.style.height = '50px';

            const projectButton = document.createElement('button');
            projectButton.classList.add('project-button');
            projectButton.textContent = project.name;

            const menuButton = document.createElement('button');
            menuButton.classList.add('menu-button');
            menuButton.innerHTML = '⋮';

            menuButton.addEventListener('click', (event) => {
                event.stopPropagation();
                showProjectMenu(event, index);
            });

            projectButton.addEventListener('click', () => {
                openProject(project.name);
            });

            projectContainer.appendChild(projectIcon);
            projectContainer.appendChild(projectButton);
            projectContainer.appendChild(menuButton);
            projectList.appendChild(projectContainer);
        });
    }

    function openProject(projectName) {
        window.location.href = "/EditorNew/index.html";
    }    

    // Открыть модальное окно
    plusButton.addEventListener('click', () => {
        projectModal.style.display = 'block';
        projectNameInput.value = ''; // Очистить поле ввода
    });

    // Закрыть модальное окно при клике вне содержимого
    projectModal.addEventListener('click', (event) => {
        if (event.target === projectModal) {
            projectModal.style.display = 'none';
        }
    });

    // Добавить проект
    submitProjectButton.addEventListener('click', () => {
        const projectName = projectNameInput.value.trim();
        if (projectName) {
            projects.push({ name: projectName });
            localStorage.setItem('projects', JSON.stringify(projects));
            renderProjects();
        } else {
            alert('Пожалуйста, введите название проекта.');
        }
        projectModal.style.display = 'none'; // Закрыть модальное окно
    });

    // Инициализация списка проектов
    renderProjects();
});
