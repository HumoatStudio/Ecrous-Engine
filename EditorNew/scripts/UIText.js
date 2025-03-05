let textIdCounter = 0; // Глобальный счетчик ID

function CreateUIText() {
    const guiText = document.createElement('div');
    guiText.classList.add('text-element');
    guiText.dataset.id = textIdCounter++; // Уникальный ID
    guiText.innerText = 'Новый текст';
    guiText.style.position = 'absolute';
    guiText.style.left = `${window.innerWidth / 2 - 100}px`;
    guiText.style.top = `${window.innerHeight / 2 - 20}px`;
    guiText.style.color = 'white';
    guiText.style.fontSize = '20px';
    guiText.style.cursor = 'grab';
    guiText.style.zIndex = '1';

    document.body.appendChild(guiText);
    syncTextsToRunMenu(); // Сразу добавляем в RunMenu

    guiText.addEventListener('click', (event) => {
        event.stopPropagation();
        deselectElement();
        selectedElement = guiText;
        guiText.style.border = '2px solid blue';
    });

    guiText.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        showTextContextMenu(event, guiText);
    });

    enableDragging(guiText);
}

// 🛠 **Обновление RunMenuPanel для текстов**
function syncTextsToRunMenu() {
    const runMenuPanel = document.getElementById('RunMenuPanel');
    const runMenuContent = runMenuPanel.querySelector('.RunMenu-content');

    // Очищаем перед обновлением
    runMenuContent.innerHTML = '';

    document.querySelectorAll('.text-element').forEach((sourceText) => {
        let textElement = document.createElement('div');
        textElement.classList.add('text-element');
        textElement.dataset.id = sourceText.dataset.id;
        textElement.innerText = sourceText.innerText;
        textElement.style.color = sourceText.style.color;
        textElement.style.fontSize = sourceText.style.fontSize;
        textElement.style.position = 'absolute';
        textElement.style.left = sourceText.style.left;
        textElement.style.top = sourceText.style.top;

        runMenuContent.appendChild(textElement);
    });
}

// 🎨 **Контекстное меню для текста**
function showTextContextMenu(event, guiText) {
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
        const newText = prompt('Введите новый текст:', guiText.innerText);
        if (newText !== null) {
            guiText.innerText = newText;
            syncTextsToRunMenu(); // 🛠 Обновляем RunMenu после изменения текста
        }
        contextMenu.remove();
    });

    const colorOption = document.createElement('div');
    colorOption.innerText = 'Цвет текста';
    colorOption.style.cursor = 'pointer';
    colorOption.style.padding = '5px';
    colorOption.addEventListener('click', () => {
        const newColor = prompt('Введите цвет текста:', guiText.style.color);
        if (newColor) {
            guiText.style.color = newColor;
            syncTextsToRunMenu(); // 🛠 Обновляем RunMenu после изменения цвета
        }
        contextMenu.remove();
    });

    const deleteOption = document.createElement('div');
    deleteOption.innerText = 'Удалить';
    deleteOption.style.cursor = 'pointer';
    deleteOption.style.padding = '5px';
    deleteOption.style.color = 'red';
    deleteOption.addEventListener('click', () => {
        guiText.remove();
        syncTextsToRunMenu(); // 🛠 Обновляем RunMenu после удаления текста
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

// 🏗 **Перемещение текста**
function enableDragging(guiText) {
    let isDragging = false;
    let offsetX, offsetY;

    guiText.addEventListener('mousedown', (event) => {
        isDragging = true;
        offsetX = event.clientX - guiText.getBoundingClientRect().left;
        offsetY = event.clientY - guiText.getBoundingClientRect().top;
        guiText.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (event) => {
        if (isDragging) {
            guiText.style.left = `${event.clientX - offsetX}px`;
            guiText.style.top = `${event.clientY - offsetY}px`;
            syncTextsToRunMenu(); // 🛠 Обновляем RunMenu после перемещения текста
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        guiText.style.cursor = 'grab';
    });
}

// 🔵 **Снятие выделения при клике вне элемента**
document.addEventListener('click', (event) => {
    if (!selectedElement || !selectedElement.contains(event.target)) {
        deselectElement();
    }
});

// ⏹ **Escape для снятия выделения**
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        deselectElement();
    }
});

function syncTextsToRunMenu() {
    const runMenuPanel = document.getElementById('RunMenuPanel');
    const runMenuContent = runMenuPanel.querySelector('.RunMenu-content');

    // Удаляем только текстовые элементы, не затрагивая кнопки и панели
    runMenuContent.querySelectorAll('.text-element').forEach(el => el.remove());

    document.querySelectorAll('.text-element').forEach((sourceText) => {
        let textElement = document.createElement('div');
        textElement.classList.add('text-element');
        textElement.dataset.id = sourceText.dataset.id;
        textElement.innerText = sourceText.innerText;
        textElement.style.color = sourceText.style.color;
        textElement.style.fontSize = sourceText.style.fontSize;
        textElement.style.position = 'absolute';
        textElement.style.left = sourceText.style.left;
        textElement.style.top = sourceText.style.top;

        runMenuContent.appendChild(textElement);
    });
}
