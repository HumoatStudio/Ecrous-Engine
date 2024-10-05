document.addEventListener('DOMContentLoaded', function () {
    const plusButton = document.querySelector('.plus-button');
    const importButton = document.querySelector('.import-button');
    const scriptModal = document.getElementById('projectModal');
    const scriptNameInput = document.getElementById('projectName');
    const submitScriptButton = document.getElementById('submitProject');
    const scriptList = document.getElementById('projectList');

    let scripts = JSON.parse(localStorage.getItem('scripts')) || [];

    function renderScripts() {
        scriptList.innerHTML = '';
        scripts.forEach((script, index) => {
            const scriptContainer = document.createElement('div');
            scriptContainer.classList.add('project-container');

            const scriptButton = document.createElement('button');
            scriptButton.classList.add('project-button');
            scriptButton.textContent = script.name;

            const menuButton = document.createElement('button');
            menuButton.classList.add('menu-button');
            menuButton.innerHTML = '⋮'; // Кнопка с тремя точками

            menuButton.addEventListener('click', (event) => {
                event.stopPropagation(); // Останавливаем всплытие событий
                showScriptMenu(event, index);
            });

            scriptButton.addEventListener('click', () => {
                openScript(script.name); // Открытие скрипта
            });

            scriptContainer.appendChild(scriptButton);
            scriptContainer.appendChild(menuButton);
            scriptList.appendChild(scriptContainer);
        });
    }

    function showScriptMenu(event, index) {
        const existingMenu = document.querySelector('.project-menu');
        if (existingMenu) existingMenu.remove();

        const menu = document.createElement('div');
        menu.classList.add('project-menu');

        const openOption = document.createElement('button');
        openOption.classList.add('menu-option');
        openOption.textContent = 'Открыть скрипт';
        openOption.addEventListener('click', () => openScript(scripts[index].name));

        const deleteOption = document.createElement('button');
        deleteOption.classList.add('menu-option');
        deleteOption.textContent = 'Удалить скрипт';
        deleteOption.addEventListener('click', () => deleteScript(index));

        menu.appendChild(openOption);
        menu.appendChild(deleteOption);
        
        menu.style.top = `${event.clientY}px`;
        menu.style.left = `${event.clientX}px`;
        document.body.appendChild(menu);

        document.addEventListener('click', () => {
            menu.remove();
        }, { once: true });
    }

    function openScript(scriptName) {
        window.location.href = `Editor/ScriptEditor.html?script=${encodeURIComponent(scriptName)}`; // Перенаправление на ScriptEditor.html
    }

    function deleteScript(index) {
        scripts.splice(index, 1);
        localStorage.setItem('scripts', JSON.stringify(scripts));
        renderScripts();
    }

    plusButton.addEventListener('click', () => {
        scriptModal.style.display = 'flex';
    });

    submitScriptButton.addEventListener('click', () => {
        const scriptName = scriptNameInput.value.trim();

        // Проверка длины названия скрипта
        if (scriptName.length < 3 || scriptName.length > 18) {
            alert('Название скрипта должно содержать от 3 до 18 символов!');
            return;
        }

        if (scriptName) {
            // Проверка на уникальность названия скрипта
            if (scripts.some(s => s.name === scriptName)) {
                alert('Скрипт с таким названием уже существует!');
                return;
            }
            scripts.push({ name: scriptName });
            localStorage.setItem('scripts', JSON.stringify(scripts));
            renderScripts();
            scriptNameInput.value = '';
            scriptModal.style.display = 'none';
        }
    });

    importButton.addEventListener('click', () => {
        console.log('Импорт скрипта');
        // Добавьте код для импорта скрипта
    });

    renderScripts();
});