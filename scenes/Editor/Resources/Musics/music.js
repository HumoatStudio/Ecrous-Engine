document.addEventListener('DOMContentLoaded', function () {
    const plusButton = document.querySelector('.plus-button');
    const projectModal = document.getElementById('projectModal');
    const projectNameInput = document.getElementById('projectName');
    const musicFileInput = document.getElementById('musicFile');
    const submitProjectButton = document.getElementById('submitProject');
    const projectList = document.getElementById('projectList');
    const musicModal = document.getElementById('musicModal');
    const audioPlayer = document.getElementById('audioPlayer');
    const closeMusicModalButton = document.getElementById('closeMusicModal');

    let projects = JSON.parse(localStorage.getItem('projects')) || []; // Загружаем проекты из localStorage
    const icons = ['icon1.png', 'icon2.png', 'icon3.png']; // Добавьте доступные иконки
    const usedIcons = new Set(); // Множество использованных иконок

    function getRandomIcon() {
        const availableIcons = icons.filter(icon => !usedIcons.has(icon));
        if (availableIcons.length === 0) return null; // Если нет доступных иконок
        const randomIndex = Math.floor(Math.random() * availableIcons.length);
        return availableIcons[randomIndex];
    }

    function renderProjects() {
        projectList.innerHTML = '';
        projects.forEach((project, index) => {
            const projectContainer = document.createElement('div');
            projectContainer.classList.add('project-container');

            const projectIcon = document.createElement('img');
            projectIcon.classList.add('project-icon');
            projectIcon.src = project.icon || 'default-icon.png'; // Используем иконку из проекта, если есть
            projectIcon.alt = 'Project Icon';
            projectIcon.style.width = '50px';  // Установка ширины
            projectIcon.style.height = '50px'; // Установка высоты

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
                playMusic(project.music); // Проигрывание музыки
            });

            projectContainer.appendChild(projectIcon); // Добавляем иконку к контейнеру
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

        const deleteOption = document.createElement('button');
        deleteOption.classList.add('menu-option');
        deleteOption.textContent = 'Удалить проект';
        deleteOption.addEventListener('click', () => confirmDeleteProject(index));

        menu.appendChild(deleteOption);

        menu.style.top = `${event.clientY}px`;
        menu.style.left = `${event.clientX}px`;
        document.body.appendChild(menu);

        document.addEventListener('click', () => {
            menu.remove();
        }, { once: true });
    }

    function confirmDeleteProject(index) {
        if (confirm('Вы уверены, что хотите удалить этот проект?')) {
            deleteProject(index);
        }
    }

    function deleteProject(index) {
        const removedProject = projects.splice(index, 1)[0];
        if (removedProject) {
            usedIcons.delete(removedProject.icon); // Удаляем иконку из использованных
        }
        localStorage.setItem('projects', JSON.stringify(projects)); // Сохраняем изменения в localStorage
        renderProjects();
    }

    function playMusic(musicURL) {
        audioPlayer.src = musicURL; // Устанавливаем источник музыки
        musicModal.style.display = 'flex'; // Показываем модальное окно для музыки
        audioPlayer.play(); // Начинаем проигрывание
    }

    closeMusicModalButton.addEventListener('click', () => {
        audioPlayer.pause(); // Останавливаем воспроизведение
        musicModal.style.display = 'none'; // Закрываем модальное окно
    });

    plusButton.addEventListener('click', () => {
        projectModal.style.display = 'flex';
        musicFileInput.value = ''; // Сбрасываем значение файла при открытии модального окна
    });

    submitProjectButton.addEventListener('click', () => {
        const projectName = projectNameInput.value.trim();

        // Проверка длины названия проекта
        if (projectName.length < 3 || projectName.length > 18) {
            alert('Название проекта должно содержать от 3 до 18 символов!');
            return;
        }

        if (projectName) {
            // Проверка на уникальность названия проекта
            if (projects.some(p => p.name === projectName)) {
                alert('Проект с таким названием уже существует!');
                return;
            }

            const icon = getRandomIcon(); // Получаем случайную иконку
            if (!icon) {
                alert('Нет доступных иконок для этого проекта.'); // Теперь это сообщение будет отображаться
                return;
            }

            // Открываем файловый менеджер
            musicFileInput.click(); // Программно открываем файловый менеджер

            // Обработчик выбора файла
            musicFileInput.onchange = () => {
                // Проверяем выбранный музыкальный файл
                if (musicFileInput.files.length === 0) {
                    alert('Пожалуйста, выберите музыкальный файл.');
                    return;
                }

                const musicFile = musicFileInput.files[0];
                const musicURL = URL.createObjectURL(musicFile); // Создаем URL для выбранного файла

                projects.push({ name: projectName, icon: icon, music: musicURL }); // Добавляем проект с иконкой и музыкальным файлом
                usedIcons.add(icon); // Добавляем иконку в использованные
                localStorage.setItem('projects', JSON.stringify(projects)); // Сохраняем проекты в localStorage
                renderProjects();
                projectNameInput.value = '';
                projectModal.style.display = 'none'; // Закрываем модальное окно проекта
            };
        }
    });

    renderProjects();
});