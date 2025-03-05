// Функция генерации уникального ID
function generateUniqueId() {
    return 'panel-' + Math.random().toString(36).substr(2, 9);
}

function CreateUIPanel() {
    const guiPanel = document.createElement('div');
    guiPanel.classList.add('square');
    guiPanel.id = generateUniqueId();
    guiPanel.style.width = '500px';
    guiPanel.style.height = '300px';
    guiPanel.style.position = 'absolute';
    guiPanel.style.backgroundColor = 'rgb(255,255,255)';
    guiPanel.style.left = `${window.innerWidth / 2 - 250}px`;
    guiPanel.style.top = `${window.innerHeight / 2 - 150}px`;
    guiPanel.style.cursor = 'grab';
    guiPanel.style.zIndex = '1';
    guiPanel.style.transform = 'rotate(0deg)';

    document.body.appendChild(guiPanel);
    CreateInRunMenuPanel(guiPanel);

    guiPanel.addEventListener('click', () => {
        selectedElement = guiPanel;
        resetHighlight();
        guiPanel.style.border = '2px solid blue';
    });

    guiPanel.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        const existingMenu = document.getElementById('context-menu');
        if (existingMenu) existingMenu.remove();

        const contextMenu = document.createElement('div');
        contextMenu.id = 'context-menu';
        contextMenu.style.position = 'absolute';
        contextMenu.style.backgroundColor = '#222';
        contextMenu.style.color = 'white';
        contextMenu.style.border = '1px solid #444';
        contextMenu.style.padding = '10px';
        contextMenu.style.zIndex = '1000';
        contextMenu.style.top = `${event.clientY}px`;
        contextMenu.style.left = `${event.clientX}px`;
        contextMenu.style.borderRadius = '8px';
        contextMenu.style.display = 'flex';
        contextMenu.style.flexDirection = 'column';
        contextMenu.style.gap = '8px';
        contextMenu.style.width = '180px';

        function createLabel(text) {
            const label = document.createElement('div');
            label.style.fontSize = '14px';
            label.style.fontWeight = 'bold';
            label.style.marginBottom = '4px';
            label.innerText = text;
            return label;
        }

        function createInput(type, placeholder, eventHandler) {
            const input = document.createElement('input');
            input.type = type;
            input.placeholder = placeholder;
            input.style.width = '100%';
            input.style.padding = '5px';
            input.style.border = 'none';
            input.style.borderRadius = '4px';
            input.style.fontSize = '14px';
            input.addEventListener('input', eventHandler);
            return input;
        }

        // Цвет
        const colorLabel = createLabel('Цвет фона:');
        const colorInput = createInput('color', '', (e) => {
            guiPanel.style.backgroundColor = e.target.value;
            syncProperties(guiPanel);
        });

        // URL изображения
        const imgLabel = createLabel('URL изображения:');
        const imageInput = createInput('text', 'Введите URL', () => {
            guiPanel.style.backgroundImage = `url(${imageInput.value})`;
            guiPanel.style.backgroundSize = 'cover';
            syncProperties(guiPanel);
        });

        // Поворот
        const rotateLabel = createLabel('Поворот (°):');
        const rotateInput = createInput('number', '0', (e) => {
            guiPanel.style.transform = `rotate(${e.target.value}deg)`;
            syncProperties(guiPanel);
        });

        // Размер
        const sizeLabel = createLabel('Размер (Ш x В):');
        const sizeInput = createInput('text', '500x300', () => {
            const [width, height] = sizeInput.value.split('x').map(val => val.trim());
            if (!isNaN(width) && !isNaN(height)) {
                guiPanel.style.width = `${width}px`;
                guiPanel.style.height = `${height}px`;
                syncProperties(guiPanel);
            }
        });

        // Кнопка удаления
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Удалить';
        deleteButton.style.width = '100%';
        deleteButton.style.padding = '8px';
        deleteButton.style.backgroundColor = 'red';
        deleteButton.style.color = 'white';
        deleteButton.style.border = 'none';
        deleteButton.style.borderRadius = '4px';
        deleteButton.style.cursor = 'pointer';
        deleteButton.style.fontSize = '14px';
        deleteButton.addEventListener('click', () => {
            guiPanel.remove();
            contextMenu.remove();

            const runMenuPanel = document.getElementById('RunMenuPanel');
            if (runMenuPanel) {
                const runMenuContent = runMenuPanel.querySelector('.RunMenu-content');
                if (runMenuContent) {
                    const copiedSquare = runMenuContent.querySelector(`#${guiPanel.id}`);
                    if (copiedSquare) copiedSquare.remove();
                }
            }
        });

        contextMenu.appendChild(colorLabel);
        contextMenu.appendChild(colorInput);
        contextMenu.appendChild(imgLabel);
        contextMenu.appendChild(imageInput);
        contextMenu.appendChild(rotateLabel);
        contextMenu.appendChild(rotateInput);
        contextMenu.appendChild(sizeLabel);
        contextMenu.appendChild(sizeInput);
        contextMenu.appendChild(deleteButton);

        document.body.appendChild(contextMenu);

        document.addEventListener('click', (e) => {
            if (!contextMenu.contains(e.target)) {
                contextMenu.remove();
            }
        }, { once: true });
    });

    let isDragging = false;
    let offsetX, offsetY;

    guiPanel.addEventListener('mousedown', (event) => {
        isDragging = true;
        offsetX = event.clientX - guiPanel.getBoundingClientRect().left;
        offsetY = event.clientY - guiPanel.getBoundingClientRect().top;
        guiPanel.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (event) => {
        if (isDragging) {
            guiPanel.style.left = `${event.clientX - offsetX}px`;
            guiPanel.style.top = `${event.clientY - offsetY}px`;
            syncProperties(guiPanel);
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        guiPanel.style.cursor = 'grab';
    });
}

function CreateInRunMenuPanel(sourceSquare) {
    const runMenuPanel = document.getElementById('RunMenuPanel');
    if (!runMenuPanel) return;

    const runMenuContent = runMenuPanel.querySelector('.RunMenu-content');
    if (!runMenuContent) return;

    let square = runMenuContent.querySelector(`#${sourceSquare.id}`);

    if (!square) {
        square = document.createElement('div');
        square.classList.add('square');
        square.id = sourceSquare.id;
        runMenuContent.appendChild(square);
    }

    syncProperties(sourceSquare);
}

function syncProperties(sourceSquare) {
    const runMenuPanel = document.getElementById('RunMenuPanel');
    if (!runMenuPanel) return;

    const runMenuContent = runMenuPanel.querySelector('.RunMenu-content');
    if (!runMenuContent) return;

    let square = runMenuContent.querySelector(`#${sourceSquare.id}`);
    if (!square) return;

    square.style.width = sourceSquare.style.width;
    square.style.height = sourceSquare.style.height;
    square.style.backgroundColor = sourceSquare.style.backgroundColor;
    square.style.backgroundImage = sourceSquare.style.backgroundImage;
    square.style.backgroundSize = sourceSquare.style.backgroundSize;
    square.style.left = sourceSquare.style.left;
    square.style.top = sourceSquare.style.top;
    square.style.transform = sourceSquare.style.transform;
}

function syncPanelsToRunMenu() {
    const runMenuPanel = document.getElementById('RunMenuPanel');
    const runMenuContent = runMenuPanel.querySelector('.RunMenu-content');

    // Удаляем только панели, не затрагивая текстовые элементы и кнопки
    runMenuContent.querySelectorAll('.square').forEach(el => el.remove());

    document.querySelectorAll('.square').forEach((sourceSquare) => {
        let square = document.createElement('div');
        square.classList.add('square');
        square.dataset.id = sourceSquare.id;
        square.style.width = sourceSquare.style.width;
        square.style.height = sourceSquare.style.height;
        square.style.backgroundColor = sourceSquare.style.backgroundColor;
        square.style.backgroundImage = sourceSquare.style.backgroundImage;
        square.style.backgroundSize = sourceSquare.style.backgroundSize;
        square.style.position = 'absolute';
        square.style.left = sourceSquare.style.left;
        square.style.top = sourceSquare.style.top;
        square.style.transform = sourceSquare.style.transform;

        runMenuContent.appendChild(square);
    });
}
