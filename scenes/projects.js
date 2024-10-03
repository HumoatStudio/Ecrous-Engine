document.addEventListener('DOMContentLoaded', function () {
    const plusButton = document.querySelector('.plus-button');
    const importButton = document.querySelector('.import-button');
    const projectModal = document.getElementById('projectModal');
    const projectNameInput = document.getElementById('projectName');
    const submitProjectButton = document.getElementById('submitProject');
    const projectList = document.getElementById('projectList');

    let projects = JSON.parse(localStorage.getItem('projects')) || [];

    function renderProjects() {
        projectList.innerHTML = '';
        projects.forEach((project, index) => {
            const projectContainer = document.createElement('div');
            projectContainer.classList.add('project-container');

            const projectButton = document.createElement('button');
            projectButton.classList.add('project-button');
            projectButton.textContent = project.name;

            const menuButton = document.createElement('button');
            menuButton.classList.add('menu-button');
            menuButton.innerHTML = '⋮'; // Кнопка с тремя точками

            menuButton.addEventListener('click', (event) => {
                event.stopPropagation(); // Останавливаем всплытие событий
                showProjectMenu(event, index);
            });

            projectButton.addEventListener('click', () => {
                openProject(project.name); // Открытие проекта
            });

            projectContainer.appendChild(projectButton);
            projectContainer.appendChild(menuButton);
            projectList.appendChild(projectContainer);
        });
    }

    function showProjectMenu(event, index) {
        const existingMenu = document.querySelector('.project-menu');
        if (existingMenu) existingMenu.remove();

        const menu = document.createElement('div');
        menu.classList.add('project-menu');

        const openOption = document.createElement('button');
        openOption.classList.add('menu-option');
        openOption.textContent = 'Открыть проект';
        openOption.addEventListener('click', () => openProject(projects[index].name));

        const exportOption = document.createElement('button');
        exportOption.classList.add('menu-option');
        exportOption.textContent = 'Экспортировать проект';
        exportOption.addEventListener('click', () => exportProject(index));

        const deleteOption = document.createElement('button');
        deleteOption.classList.add('menu-option');
        deleteOption.textContent = 'Удалить проект';
        deleteOption.addEventListener('click', () => deleteProject(index));

        menu.appendChild(openOption);
        menu.appendChild(exportOption);
        menu.appendChild(deleteOption);
        
        menu.style.top = `${event.clientY}px`;
        menu.style.left = `${event.clientX}px`;
        document.body.appendChild(menu);

        document.addEventListener('click', () => {
            menu.remove();
        }, { once: true });
    }

    function openProject(projectName) {
        window.location.href = `Editor/Editor.html?project=${encodeURIComponent(projectName)}`; // Перенаправление на Editor.html
    }

    function exportProject(index) {
        const project = projects[index];
        console.log('Экспортируем проект:', project);
        // Добавьте код для экспорта проекта
    }

    function deleteProject(index) {
        projects.splice(index, 1);
        localStorage.setItem('projects', JSON.stringify(projects));
        renderProjects();
    }

    plusButton.addEventListener('click', () => {
        projectModal.style.display = 'flex';
    });

    submitProjectButton.addEventListener('click', () => {
        const projectName = projectNameInput.value.trim();
        if (projectName) {
            // Проверка на уникальность названия проекта
            if (projects.some(p => p.name === projectName)) {
                alert('Проект с таким названием уже существует!');
                return;
            }
            projects.push({ name: projectName });
            localStorage.setItem('projects', JSON.stringify(projects));
            renderProjects();
            projectNameInput.value = '';
            projectModal.style.display = 'none';
        }
    });

    importButton.addEventListener('click', () => {
        console.log('Импорт проекта');
        // Добавьте код для импорта проекта
    });

    renderProjects();
});