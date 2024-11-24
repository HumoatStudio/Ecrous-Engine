// Функция для перехода на другую страницу
function openPage(pageUrl) {
    window.location.href = pageUrl;
}

window.addEventListener('load', function () {
  // Скрыть загрузочный экран через 5 секунд
  setTimeout(() => {
    const loader = document.getElementById('loader');
    loader.style.display = 'none';  // Скрыть экран загрузки
  }, 5000);  // задержка 5 секунд
});

// Скрываем модальные окна при старте
window.onload = function() {
    var modal = document.getElementById("myModal"); // Модальное окно
    var modalNews = document.getElementById("myModalNews"); // Модальное окно новостей

    if (modal) modal.style.display = "none"; // Скрываем модальное окно при старте
    if (modalNews) modalNews.style.display = "none"; // Скрываем модальное окно новостей при старте
};

// Получаем элементы DOM
var modal = document.getElementById("myModal"); // Модальное окно
var btn = document.getElementById("myBtn"); // Кнопка "Благодарности"
var span = document.getElementsByClassName("close")[0]; // Кнопка закрытия

var modalNews = document.getElementById("myModalNews"); // Модальное окно новостей
var btnNews = document.getElementById("News"); // Кнопка "Новости"
var NewsClose = document.getElementsByClassName("closeNews")[0]; // Кнопка закрытия новостей

// Проверяем наличие элементов перед добавлением событий
if (btn && modal) {
    btn.onclick = function() {
        modal.style.display = "block"; // Показываем модальное окно
    };
}

if (span && modal) {
    span.onclick = function() {
        modal.style.display = "none"; // Закрываем модальное окно
    };
}

if (btnNews && modalNews) {
    btnNews.onclick = function() {
        modalNews.style.display = "block"; // Показываем модальное окно новостей
    };
}

if (NewsClose && modalNews) {
    NewsClose.onclick = function() {
        modalNews.style.display = "none"; // Закрываем модальное окно новостей
    };
}

// Функция для открытия секций
function openSection(section) {
    // Скрываем все секции
    const sections = document.querySelectorAll('.section');
    sections.forEach(function(sec) {
        sec.style.display = 'none';
    });

    // Показываем выбранную секцию
    const activeSection = document.getElementById(section);
    if (activeSection) {
        activeSection.style.display = 'block';
    }
}

// Закрываем модальные окна при клике вне их
window.onclick = function(event) {
    if (modal && event.target == modal) {
        modal.style.display = "none"; // Закрываем модальное окно
    }
    if (modalNews && event.target == modalNews) {
        modalNews.style.display = "none"; // Закрываем модальное окно новостей
    }
};

function openNewsSection(sectionId) {
    const sections = document.querySelectorAll('.news-section');
    sections.forEach(section => {
        section.style.display = 'none'; // Скрыть все секции
    });

    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.style.display = 'block'; // Показать выбранную секцию
    }
}

// Показываем "Что нового?" при открытии модального окна
document.addEventListener('DOMContentLoaded', () => {
    openNewsSection('newNews');
});

//Settings

function openSettings() {
    const settingsPanel = document.getElementById('settingsPanel');
    settingsPanel.style.display = 'flex'; // Показываем панель
}

function closeSettings() {
    const settingsPanel = document.getElementById('settingsPanel');
    settingsPanel.style.display = 'none'; // Скрываем панель
}

//Community

function openCommunity() {
    const CommunityPanel = document.getElementById('CommunityPanel');
    CommunityPanel.style.display = 'flex'; // Показываем панель
}

function closeCommunity() {
    const CommunityPanel = document.getElementById('CommunityPanel');
    CommunityPanel.style.display = 'none'; // Скрываем панель
}

//CommunityProj1

function openCommunityProj1() {
    const ResourcesPanel = document.getElementById('CommunityProj1Panel');
    CommunityProj1Panel.style.display = 'flex'; // Показываем панель
}

function closeCommunityProj1() {
    const CommunityProj1Panel = document.getElementById('CommunityProj1Panel');
    CommunityProj1Panel.style.display = 'none'; // Скрываем панель
}

//Profile

function openProfile() {
    const ProfilePanel = document.getElementById('ProfilePanel');
    ProfilePanel.style.display = 'flex'; // Показываем панель
}

function closeProfile() {
    const ProfilePanel = document.getElementById('ProfilePanel');
    ProfilePanel.style.display = 'none'; // Скрываем панель
}

// Получаем элементы из DOM
const circle = document.querySelector('.circle');
const usernameDisplay = document.querySelector('.username');

// Функция для генерации случайного ника
function generateRandomNickname() {
    const randomNumber = Math.floor(Math.random() * (9999 - 1111 + 1)) + 1111; // Генерируем число от 1111 до 9999
    return `User${randomNumber}`; // Добавляем "User" в начало
}

// Функция для загрузки имени пользователя из localStorage или генерации случайного
function loadUsername() {
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
        return savedUsername; // Возвращаем сохраненное имя, если оно есть
    } else {
        const randomUsername = generateRandomNickname();
        localStorage.setItem('username', randomUsername); // Сохраняем случайный ник
        return randomUsername;
    }
}

// Функция для сохранения имени пользователя
function saveUsername(username) {
    localStorage.setItem('username', username);
}

// Установка имени пользователя при загрузке страницы
let currentNickname = loadUsername();
usernameDisplay.innerText = currentNickname;

// Функция для загрузки изображения из localStorage
function loadCircleImage() {
    const savedImage = localStorage.getItem('circleImage');
    if (savedImage) {
        circle.style.backgroundImage = `url(${savedImage})`;
        circle.style.backgroundSize = 'cover';
    } else {
        circle.style.backgroundImage = 'url("../sprites/app.png")'; // Устанавливаем начальное изображение
        circle.style.backgroundSize = 'cover';
    }
}

// Функция для сохранения изображения круга в localStorage
function saveCircleImage(imageData) {
    localStorage.setItem('circleImage', imageData);
}

// Загрузка изображения пользователя
function loadImage() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = event => {
        const file = event.target.files[0];
        const reader = new FileReader();
        
        reader.onload = e => {
            const imageData = e.target.result;
            circle.style.backgroundImage = `url(${imageData})`;
            circle.style.backgroundSize = 'cover';
            saveCircleImage(imageData); // Сохраняем изображение в localStorage
        };
        
        if (file) {
            reader.readAsDataURL(file);
        }
    };
    
    input.click(); // Открываем файловый менеджер
}

// Обработчик события на круг (загрузка изображения)
circle.addEventListener('click', loadImage);

// Загрузка данных при открытии страницы
document.addEventListener('DOMContentLoaded', () => {
    currentNickname = loadUsername(); // Загрузим сохраненное или случайное имя
    usernameDisplay.innerText = currentNickname; // Отображаем имя
    loadCircleImage(); // Загрузка иконки
});

// MyProjects
function openMyProjects() {
    const MyProjectsPanel = document.getElementById('MyProjectsPanel');
    MyProjectsPanel.style.display = 'flex'; // Show the panel
}

function closeMyProjects() {
    const MyProjectsPanel = document.getElementById('MyProjectsPanel');
    MyProjectsPanel.style.display = 'none'; // Hide the panel
}

document.addEventListener('DOMContentLoaded', function () {
    const plusButton = document.querySelector('.plus-button');
    const importButton = document.querySelector('.import-button');
    const projectModal = document.getElementById('projectModal');
    const projectNameInput = document.getElementById('projectName');
    const platformSelect = document.getElementById('platformSelect');
    const submitProjectButton = document.getElementById('submitProject');
    const projectList = document.getElementById('projectList');
    const titleEditor = document.querySelector('.titleEditor');

    let projects = JSON.parse(localStorage.getItem('projects')) || [];

    function renderProjects() {
        projectList.innerHTML = '';
        projects.forEach((project, index) => {
            const projectContainer = document.createElement('div');
            projectContainer.classList.add('project-container');

            const projectIcon = document.createElement('img');
            projectIcon.classList.add('project-icon');
            projectIcon.src = project.platform === 'Android'
                ? 'sprites/PJIcon/IconAndroidProject.svg'
                : project.platform === 'iOS'
                    ? 'sprites/PJIcon/IPAIconProjects.png'
                    : project.platform === 'Windows'
                        ? 'sprites/PJIcon/EXEIconProjects.png'
                        : project.platform === 'MacOS'
                            ? 'sprites/PJIcon/ICNSIconProjects.png'
                            : 'sprites/PJIcon/IPAIconProjects.png';
            projectIcon.alt = 'Project Icon';
            projectIcon.style.width = '50px';  // Reduced width
            projectIcon.style.height = '50px'; // Reduced height

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
        deleteOption.addEventListener('click', () => confirmDeleteProject(index));

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
        const projectArea = document.getElementById('projectArea');
        if (projectArea) {
            projectArea.style.display = 'none'; // Hide the project area
        }

        const EditorPanel = document.getElementById('EditorPanel');
        if (EditorPanel) {
            EditorPanel.style.display = 'flex'; // Show the editor panel
        }

        // Изменяем название проекта в редакторе
        if (titleEditor) {
            titleEditor.textContent = projectName;
        }

        console.log(`Открыт проект: ${projectName}`);
    }

    function exportProject(index) {
        const project = projects[index];
        console.log('Экспортируем проект:', project);
        // Add code for exporting project
    }

    function confirmDeleteProject(index) {
        if (confirm('Вы уверены, что хотите удалить этот проект?')) {
            deleteProject(index);
        }
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
        const platform = platformSelect.value;

        if (projectName.length < 3 || projectName.length > 18) {
            alert('Название проекта должно содержать от 3 до 18 символов!');
            return;
        }

        if (projects.some(p => p.name === projectName)) {
            alert('Проект с таким названием уже существует!');
            return;
        }

        projects.push({ name: projectName, platform });
        localStorage.setItem('projects', JSON.stringify(projects));
        renderProjects();
        projectNameInput.value = '';
        projectModal.style.display = 'none';
    });

    importButton.addEventListener('click', () => {
        console.log('Импорт проекта');
        // Add code for importing a project
    });

    renderProjects();
});

// Editor
function openEditor() {
    const EditorPanel = document.getElementById('EditorPanel');
    EditorPanel.style.display = 'flex'; // Show the editor panel
}

function closeEditor() {
    const EditorPanel = document.getElementById('EditorPanel');
    EditorPanel.style.display = 'none'; // Hide the editor panel
}

// Scriptings
function openScriptings() {
    const ScriptingsPanel = document.getElementById('ScriptingsPanel');
    ScriptingsPanel.style.display = 'flex'; // Show the panel
}

function closeScriptings() {
    const ScriptingsPanel = document.getElementById('ScriptingsPanel');
    ScriptingsPanel.style.display = 'none'; // Hide the panel
}

document.addEventListener('DOMContentLoaded', function () {
    const plusButtonscript = document.querySelector('.plus-button-script');
    const scriptModal = document.getElementById('scriptModal');
    const scriptNameInput = document.getElementById('scriptName');
    const languageSelect = document.getElementById('languageSelect');
    const submitScriptButton = document.getElementById('submitScript');
    const scriptList = document.getElementById('scriptList');

    let scripts = JSON.parse(localStorage.getItem('scripts')) || [];

    function renderScripts() {
        scriptList.innerHTML = '';
        scripts.forEach((script, index) => {
            const scriptContainer = document.createElement('div');
            scriptContainer.classList.add('script-container');

            const scriptButton = document.createElement('button');
            scriptButton.classList.add('script-button');
            scriptButton.textContent = `${script.name} (${script.language})`;

            const menuButton = document.createElement('button');
            menuButton.classList.add('menu-button');
            menuButton.innerHTML = '⋮';

            menuButton.addEventListener('click', (event) => {
                event.stopPropagation();
                showScriptMenu(event, index);
            });

            scriptButton.addEventListener('click', () => {
                openScript(script);
            });

            scriptContainer.appendChild(scriptButton);
            scriptContainer.appendChild(menuButton);
            scriptList.appendChild(scriptContainer);
        });
    }

    const editorPaths = {
        python: 'Python/python.html',
        java: 'Java/java.html',
        nexlang: 'NexLang/NexLang.html',
    };

    function openScript(script) {
        if (script.language === 'visual') {
            openVisualScript(); // For visual scripting
        } else if (editorPaths[script.language]) {
            window.location.href = editorPaths[script.language]; // Open the corresponding editor
        } else {
            alert(`Открытие редактора для языка "${script.language}" пока не поддерживается.`);
        }
    }

    function showScriptMenu(event, index) {
        const menu = document.createElement('div');
        menu.classList.add('script-menu');

        const editOption = document.createElement('button');
        editOption.classList.add('menu-option');
        editOption.textContent = 'Редактировать';
        editOption.addEventListener('click', () => {
            alert('Функция редактирования пока не реализована.');
            menu.remove();
        });

        const deleteOption = document.createElement('button');
        deleteOption.classList.add('menu-option');
        deleteOption.textContent = 'Удалить';
        deleteOption.addEventListener('click', () => {
            scripts.splice(index, 1);
            localStorage.setItem('scripts', JSON.stringify(scripts));
            renderScripts();
            menu.remove();
        });

        menu.appendChild(editOption);
        menu.appendChild(deleteOption);

        menu.style.top = `${event.clientY}px`;
        menu.style.left = `${event.clientX}px`;
        document.body.appendChild(menu);

        document.addEventListener('click', () => {
            menu.remove();
        }, { once: true });
    }

    plusButtonscript.addEventListener('click', () => {
        scriptModal.style.display = 'flex';
    });

    submitScriptButton.addEventListener('click', () => {
        const scriptName = scriptNameInput.value.trim();
        const language = languageSelect.value;

        if (scriptName.length < 3 || scriptName.length > 18) {
            alert('Название скрипта должно содержать от 3 до 18 символов!');
            return;
        }

        if (scripts.some(s => s.name === scriptName)) {
            alert('Скрипт с таким названием уже существует!');
            return;
        }

        scripts.push({ name: scriptName, language });
        localStorage.setItem('scripts', JSON.stringify(scripts));
        renderScripts();
        scriptNameInput.value = '';
        scriptModal.style.display = 'none';
    });

    renderScripts();
});

//Resources

function openResources() {
    const ResourcesPanel = document.getElementById('ResourcesPanel');
    ResourcesPanel.style.display = 'flex'; // Показываем панель
}

function closeResources() {
    const ResourcesPanel = document.getElementById('ResourcesPanel');
    ResourcesPanel.style.display = 'none'; // Скрываем панель
}

//VisualScript

function openVisualScript() {
    const VisualScriptPanel = document.getElementById('VisualScriptPanel');
    VisualScriptPanel.style.display = 'flex'; // Показываем панель
}

function closeVisualScript() {
    const VisualScriptPanel = document.getElementById('VisualScriptPanel');
    VisualScriptPanel.style.display = 'none'; // Скрываем панель
}

// Пример интерактивности для кнопок
document.querySelectorAll('.VisualScriptButton').forEach(button => {
    button.addEventListener('click', () => {
        alert(`Нажата кнопка: ${button.textContent}`);
    });
});
