document.addEventListener('DOMContentLoaded', function () {
    const plusButton = document.querySelector('.plus-button');
    const importButton = document.querySelector('.import-button');
    const scriptModal = document.getElementById('projectModal');
    const scriptNameInput = document.getElementById('projectName');
    const languageSelect = document.getElementById('languageSelect');
    const submitScriptButton = document.getElementById('submitProject');
    const scriptList = document.getElementById('projectList');

    let scripts = JSON.parse(localStorage.getItem('scripts')) || [];

    // Функция для отображения скриптов на экране
    function renderScripts() {
        scriptList.innerHTML = '';
        scripts.forEach((script, index) => {
            const scriptContainer = document.createElement('div');
            scriptContainer.classList.add('project-container');

            const scriptButton = document.createElement('button');
            scriptButton.classList.add('project-button');
            scriptButton.textContent = `${script.name} (${script.language})`;

            const menuButton = document.createElement('button');
            menuButton.classList.add('menu-button');
            menuButton.innerHTML = '⋮';

            menuButton.addEventListener('click', (event) => {
                event.stopPropagation();
                showScriptMenu(event, index);
            });

            scriptButton.addEventListener('click', () => {
                openScript(script);  // Открываем скрипт
            });

            scriptContainer.appendChild(scriptButton);
            scriptContainer.appendChild(menuButton);
            scriptList.appendChild(scriptContainer);
        });
    }

    // Функция для открытия выбранного скрипта в зависимости от языка
    function openScript(script) {
        if (script.language === 'visual') {
            window.location.href = 'VisualScript/vsscript.html';  // Открываем редактор для визуального программирования
        } else if (script.language === 'python') {
            window.location.href = 'Python/python.html';  // Открываем редактор для Python
        } else if (script.language === 'java') {
            window.location.href = 'Java/java.html';  // Открываем редактор для java
        } else {
            alert(`Открытие редактора для языка ${script.language} пока не поддерживается.`);
        }
    }

    // Показать меню для редактирования или удаления скрипта
    function showScriptMenu(event, index) {
        const menu = document.createElement('div');
        menu.classList.add('project-menu');

        const editOption = document.createElement('button');
        editOption.classList.add('menu-option');
        editOption.textContent = 'Редактировать';
        editOption.addEventListener('click', () => {
            // Логика редактирования скрипта
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

        document.body.appendChild(menu);

        const rect = event.target.getBoundingClientRect();
        menu.style.left = `${rect.left}px`;
        menu.style.top = `${rect.bottom}px`;

        // Удаляем меню при клике за пределами
        document.addEventListener('click', function hideMenu(event) {
            if (!menu.contains(event.target)) {
                menu.remove();
                document.removeEventListener('click', hideMenu);
            }
        });
    }

    // Открытие модального окна для добавления скрипта
    plusButton.addEventListener('click', () => {
        scriptModal.style.display = 'flex';
    });

    // Закрытие модального окна при нажатии на кнопку "Готово"
    submitScriptButton.addEventListener('click', () => {
        const scriptName = scriptNameInput.value.trim();
        const selectedLanguage = languageSelect.value;

        if (scriptName) {
            scripts.push({ name: scriptName, language: selectedLanguage });
            localStorage.setItem('scripts', JSON.stringify(scripts));
            renderScripts();
            scriptModal.style.display = 'none';
            scriptNameInput.value = '';
        } else {
            alert('Пожалуйста, введите название скрипта.');
        }
    });

    // Закрытие модального окна при клике вне его области
    scriptModal.addEventListener('click', (event) => {
        if (event.target === scriptModal) {
            scriptModal.style.display = 'none';
        }
    });

    // Начальная загрузка списка скриптов
    renderScripts();
});
