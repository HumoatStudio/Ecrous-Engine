function deselectElement() {
    if (selectedElement) {
        selectedElement.style.border = '2px solid white'; // Возвращаем стандартный стиль
        selectedElement = null;
    }
}

let textFieldIdCounter = 0; // Глобальный счетчик ID

function CreateUITextField() {
    const textField = document.createElement('input');
    textField.type = 'text';
    textField.classList.add('text-field-element', 'text-element'); // Добавляем text-element
    textField.dataset.id = textFieldIdCounter++; // Уникальный ID
    textField.value = 'Введите текст';
    textField.style.position = 'absolute';
    textField.style.left = `${window.innerWidth / 2 - 100}px`;
    textField.style.top = `${window.innerHeight / 2 - 20}px`;
    textField.style.color = 'white';
    textField.style.fontSize = '20px';
    textField.style.background = 'transparent';
    textField.style.border = '2px solid white';
    textField.style.padding = '5px';
    textField.style.zIndex = '1';

    document.body.appendChild(textField);
    syncTextFieldsToRunMenu();
    syncTextsToRunMenu(); // 🛠 Синхронизируем новый текстовый элемент

    textField.addEventListener('click', (event) => {
        event.stopPropagation();
        deselectElement();
        selectedElement = textField;
        textField.style.border = '2px solid blue';
    });

    textField.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        showTextFieldContextMenu(event, textField);
    });

    enableDragging(textField);
}

// 🛠 **Обновление RunMenuPanel для текстовых полей**
function syncTextFieldsToRunMenu() {
    const runMenuPanel = document.getElementById('RunMenuPanel');
    const runMenuContent = runMenuPanel.querySelector('.RunMenu-content');

    runMenuContent.innerHTML = '';

    document.querySelectorAll('.text-field-element').forEach((sourceTextField) => {
        let textField = document.createElement('input');
        textField.type = 'text';
        textField.classList.add('text-field-element');
        textField.dataset.id = sourceTextField.dataset.id;
        textField.value = sourceTextField.value;
        textField.style.color = sourceTextField.style.color;
        textField.style.fontSize = sourceTextField.style.fontSize;
        textField.style.position = 'absolute';
        textField.style.left = sourceTextField.style.left;
        textField.style.top = sourceTextField.style.top;

        runMenuContent.appendChild(textField);
    });
}

// 🆕 **Обновление RunMenuPanel для текстовых элементов**
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

// 🎨 **Контекстное меню для TextField**
function showTextFieldContextMenu(event, textField) {
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

    const colorOption = document.createElement('div');
    colorOption.innerText = 'Цвет текста';
    colorOption.style.cursor = 'pointer';
    colorOption.style.padding = '5px';
    colorOption.addEventListener('click', () => {
        const newColor = prompt('Введите цвет текста:', textField.style.color);
        if (newColor) {
            textField.style.color = newColor;
            syncTextFieldsToRunMenu();
            syncTextsToRunMenu(); // 🛠 Синхронизируем текстовые элементы
        }
        contextMenu.remove();
    });

    const deleteOption = document.createElement('div');
    deleteOption.innerText = 'Удалить';
    deleteOption.style.cursor = 'pointer';
    deleteOption.style.padding = '5px';
    deleteOption.style.color = 'red';
    deleteOption.addEventListener('click', () => {
        textField.remove();
        syncTextFieldsToRunMenu();
        syncTextsToRunMenu(); // 🛠 Удаляем текстовые элементы из RunMenu
        contextMenu.remove();
    });

    document.addEventListener('click', (e) => {
        if (!contextMenu.contains(e.target)) {
            contextMenu.remove();
        }
    }, { once: true });

    contextMenu.appendChild(colorOption);
    contextMenu.appendChild(deleteOption);
    document.body.appendChild(contextMenu);
}

// 🏗 **Перемещение TextField**
function enableDragging(textField) {
    let isDragging = false;
    let offsetX, offsetY;

    textField.addEventListener('mousedown', (event) => {
        isDragging = true;
        offsetX = event.clientX - textField.getBoundingClientRect().left;
        offsetY = event.clientY - textField.getBoundingClientRect().top;
        textField.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (event) => {
        if (isDragging) {
            textField.style.left = `${event.clientX - offsetX}px`;
            textField.style.top = `${event.clientY - offsetY}px`;
            syncTextFieldsToRunMenu();
            syncTextsToRunMenu();
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        textField.style.cursor = 'text';
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
