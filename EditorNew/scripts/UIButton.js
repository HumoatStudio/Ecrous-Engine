let buttonIdCounter = 0;

function CreateUIButton() {
    const guiButton = document.createElement('button');
    guiButton.classList.add('button');
    guiButton.dataset.id = buttonIdCounter++; // Уникальный ID для каждой кнопки
    guiButton.style.width = '150px';
    guiButton.style.height = '50px';
    guiButton.style.position = 'absolute';
    guiButton.style.backgroundColor = 'rgb(0,122,255)';
    guiButton.style.color = 'white';
    guiButton.style.border = 'none';
    guiButton.style.left = `${window.innerWidth / 2 - 75}px`;
    guiButton.style.top = `${window.innerHeight / 2 - 25}px`;
    guiButton.style.cursor = 'pointer';
    guiButton.style.zIndex = '1';
    guiButton.innerText = 'Нажми меня';

    document.body.appendChild(guiButton);
    syncButtonsToRunMenu();

    guiButton.addEventListener('click', () => {
        selectedElement = guiButton;
        resetHighlight();
        guiButton.style.border = '2px solid blue';
    });

    guiButton.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        showContextMenu(event, guiButton);
    });

    enableDragging(guiButton);
}

function syncButtonsToRunMenu() {
    const runMenuPanel = document.getElementById('RunMenuPanel');
    const runMenuContent = runMenuPanel.querySelector('.RunMenu-content');

    // Очистка перед добавлением актуальных кнопок
    runMenuContent.innerHTML = '';

    document.querySelectorAll('.button').forEach((sourceButton) => {
        let button = document.createElement('button');
        button.classList.add('button');
        button.dataset.id = sourceButton.dataset.id;
        button.innerText = sourceButton.innerText;
        button.style.backgroundColor = sourceButton.style.backgroundColor;
        button.style.width = sourceButton.style.width;
        button.style.height = sourceButton.style.height;
        button.style.position = 'absolute';
        button.style.left = sourceButton.style.left;
        button.style.top = sourceButton.style.top;

        runMenuContent.appendChild(button);
    });
}

function showContextMenu(event, guiButton) {
    const existingMenu = document.getElementById('context-menu');
    if (existingMenu) existingMenu.remove();

    const contextMenu = document.createElement('div');
    contextMenu.id = 'context-menu';
    contextMenu.style.position = 'absolute';
    contextMenu.style.backgroundColor = '#333';
    contextMenu.style.color = 'white';
    contextMenu.style.border = '1px solid #444';
    contextMenu.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.8)';
    contextMenu.style.padding = '10px';
    contextMenu.style.zIndex = '1000';
    contextMenu.style.top = `${event.clientY}px`;
    contextMenu.style.left = `${event.clientX}px`;
    contextMenu.style.borderRadius = '8px';

    const textOption = document.createElement('div');
    textOption.innerText = 'Изменить текст';
    textOption.style.cursor = 'pointer';
    textOption.style.padding = '5px';
    textOption.addEventListener('click', () => {
        const newText = prompt('Введите новый текст:', guiButton.innerText);
        if (newText !== null) {
            guiButton.innerText = newText;
            syncButtonsToRunMenu();
        }
        contextMenu.remove();
    });

    const colorOption = document.createElement('div');
    colorOption.innerText = 'Изменить цвет';
    colorOption.style.cursor = 'pointer';
    colorOption.style.padding = '5px';
    colorOption.addEventListener('click', () => {
        const newColor = prompt('Введите цвет кнопки:', guiButton.style.backgroundColor);
        if (newColor) {
            guiButton.style.backgroundColor = newColor;
            syncButtonsToRunMenu();
        }
        contextMenu.remove();
    });

    const deleteOption = document.createElement('div');
    deleteOption.innerText = 'Удалить';
    deleteOption.style.cursor = 'pointer';
    deleteOption.style.padding = '5px';
    deleteOption.style.color = 'red';
    deleteOption.addEventListener('click', () => {
        guiButton.remove();
        syncButtonsToRunMenu();
        contextMenu.remove();
    });

    document.addEventListener('click', (e) => {
        if (!contextMenu.contains(e.target)) {
            contextMenu.remove();
        }
    }, { once: true });

    contextMenu.appendChild(textOption);
    contextMenu.appendChild(colorOption);
    contextMenu.appendChild(deleteOption);
    document.body.appendChild(contextMenu);
}

function enableDragging(guiButton) {
    let isDragging = false;
    let offsetX, offsetY;

    guiButton.addEventListener('mousedown', (event) => {
        isDragging = true;
        offsetX = event.clientX - guiButton.getBoundingClientRect().left;
        offsetY = event.clientY - guiButton.getBoundingClientRect().top;
        guiButton.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (event) => {
        if (isDragging) {
            guiButton.style.left = `${event.clientX - offsetX}px`;
            guiButton.style.top = `${event.clientY - offsetY}px`;
            syncButtonsToRunMenu();
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        guiButton.style.cursor = 'pointer';
    });
}

function syncButtonsToRunMenu() {
    const runMenuPanel = document.getElementById('RunMenuPanel');
    const runMenuContent = runMenuPanel.querySelector('.RunMenu-content');

    // Удаляем только кнопки, не затрагивая текстовые элементы и панели
    runMenuContent.querySelectorAll('.button').forEach(el => el.remove());

    document.querySelectorAll('.button').forEach((sourceButton) => {
        let button = document.createElement('button');
        button.classList.add('button');
        button.dataset.id = sourceButton.dataset.id;
        button.innerText = sourceButton.innerText;
        button.style.backgroundColor = sourceButton.style.backgroundColor;
        button.style.width = sourceButton.style.width;
        button.style.height = sourceButton.style.height;
        button.style.position = 'absolute';
        button.style.left = sourceButton.style.left;
        button.style.top = sourceButton.style.top;

        runMenuContent.appendChild(button);
    });
}
