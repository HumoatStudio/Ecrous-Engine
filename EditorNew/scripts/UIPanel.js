// Подключаем Matter.js
const { Engine, Render, Runner, World, Bodies, Events } = Matter;

// Создаем физический движок
const engine = Engine.create();
engine.world.gravity.y = 1; // Включаем гравитацию
const { world } = engine;

// Создаем рендерер
const render = Render.create({
    element: document.getElementById('RunMenuPanel'),
    engine: engine,
    options: {
        width: document.getElementById('RunMenuPanel').clientWidth,
        height: document.getElementById('RunMenuPanel').clientHeight,
        wireframes: false,
        background: 'transparent'
    }
});

Render.run(render);
Runner.run(Runner.create(), engine);

// Функция добавления физики
function addRigidbody2D(element) {
    //if (element.id === 'RunMenuPanel') return; // Запрещаем добавлять RunMenuPanel в физический мир

    const rect = element.getBoundingClientRect();
    const body = Bodies.rectangle(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2,
        rect.width,
        rect.height,
        {
            isStatic: false,
            restitution: 0.2,
            friction: 0.8,
            density: 0.001,
            render: {
                fillStyle: element.style.backgroundColor || 'white'
            }
        }
    );

    element.dataset.bodyId = body.id;
    World.add(world, body);
}

// Функция удаления физического объекта
function removeRigidbody2D(element) {
    const bodyId = element.dataset.bodyId;
    if (bodyId) {
        const body = world.bodies.find(b => b.id === parseInt(bodyId));
        if (body) {
            World.remove(world, body);
        }
        delete element.dataset.bodyId;
    }
}

// Обновляем позиции элементов
Events.on(engine, 'beforeUpdate', () => {
    world.bodies.forEach(body => {
        const el = document.querySelector(`[data-body-id='${body.id}']`);
        if (el) {
            el.style.left = `${body.position.x - body.bounds.max.x / 2}px`;
            el.style.top = `${body.position.y - body.bounds.max.y / 2}px`;
            el.style.transform = `rotate(${body.angle}rad)`;
        }
    });
});















let keyComboTracker = [];
const activationKeys = ['ShiftLeft', 'KeyU', 'KeyP'];

document.addEventListener('keydown', function(event) {
    if (activationKeys.includes(event.code)) {
        if (event.code === 'ShiftLeft' && keyComboTracker.length === 0) {
            keyComboTracker.push(event.code);
        } else if (keyComboTracker.length > 0 && activationKeys[keyComboTracker.length] === event.code) {
            keyComboTracker.push(event.code);
        } else {
            keyComboTracker = []; // Сбрасываем, если последовательность нарушена
        }

        if (keyComboTracker.length === activationKeys.length) {
            CreateUIPanel(); // Вызываем CreateUIPanel()
            closeUIMenu(); // Закрываем меню
            keyComboTracker = []; // Сброс после успешного ввода
        }
    } else {
        keyComboTracker = []; // Сброс, если нажата не та клавиша
    }
});

// Функция генерации уникального ID
function generateUniqueId() {
    return 'panel-' + Math.random().toString(36).substr(2, 9);
}

document.addEventListener('DOMContentLoaded', function () {
    const targetElement = document.getElementById('context-menu');

    if (!targetElement) {
        //console.error('Ошибка: Элемент #contextmenu не найден!');
        return;
    }

    let pressTimer;

    targetElement.addEventListener('touchstart', function (event) {
        pressTimer = setTimeout(() => {
            event.preventDefault();
            openContextMenu(event.touches[0].clientX, event.touches[0].clientY);
        }, 500);
    });

    targetElement.addEventListener('touchend', function () {
        clearTimeout(pressTimer);
    });

    targetElement.addEventListener('touchmove', function () {
        clearTimeout(pressTimer);
    });
});

function CreateUIPanel() {
    const guiPanel = document.createElement('div');
    guiPanel.classList.add('square');
    guiPanel.id = generateUniqueId();
    guiPanel.style.width = '300px';
    guiPanel.style.height = '200px';
    guiPanel.style.position = 'absolute';
    guiPanel.style.backgroundColor = 'rgb(255,255,255)';
    guiPanel.style.left = `${window.innerWidth / 2 - 150}px`;
    guiPanel.style.top = `${window.innerHeight / 2 - 100}px`;
    guiPanel.style.cursor = 'grab';
    guiPanel.style.zIndex = '1';
    guiPanel.style.transform = 'rotate(0deg)';

    document.body.appendChild(guiPanel);
    CreateInRunMenuPanel(guiPanel); // Создаём копию в RunMenuPanel

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

        function createCheckbox(labelText, property, callback) {
            const wrapper = document.createElement('div');
            wrapper.style.display = 'flex';
            wrapper.style.alignItems = 'center';
            wrapper.style.gap = '5px';
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = guiPanel.dataset[property] === 'true';
            checkbox.addEventListener('change', (e) => {
                guiPanel.dataset[property] = e.target.checked;
                callback(e.target.checked);
            });
            
            const label = document.createElement('label');
            label.innerText = labelText;
            label.style.fontSize = '14px';

            wrapper.appendChild(checkbox);
            wrapper.appendChild(label);
            return wrapper;
        }

        //Компоненты
        const rigidbodyToggle = createCheckbox('Rigidbody2D', 'rigidbody', (enabled) => {
            if (enabled) {
                console.log('Rigidbody2D добавлен');
                guiPanel.dataset.rigidbody = 'true';
                addRigidbody2D(guiPanel);
            } else {
                console.log('Rigidbody2D удалён');
                guiPanel.dataset.rigidbody = 'false';
                removeRigidbody2D(guiPanel);
            }
            syncProperties(guiPanel);
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
        contextMenu.appendChild(rigidbodyToggle);
        contextMenu.appendChild(deleteButton);

        document.body.appendChild(contextMenu);

        document.addEventListener('click', (e) => {
            if (!contextMenu.contains(e.target)) {
                contextMenu.remove();
            }
        }, { once: true });
    });

    setTimeout(() => {
        document.addEventListener('click', (e) => {
            const contextMenu = document.getElementById('context-menu'); // Находим заново
            if (contextMenu && !contextMenu.contains(e.target)) {
                contextMenu.remove();
            }
        }, { once: true });
    }, 100);    
    

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

    //Mobile Controller

    function startDrag(event) {
        isDragging = true;
        let clientX = event.clientX || event.touches[0].clientX;
        let clientY = event.clientY || event.touches[0].clientY;
        offsetX = clientX - guiPanel.getBoundingClientRect().left;
        offsetY = clientY - guiPanel.getBoundingClientRect().top;
        guiPanel.style.cursor = 'grabbing';
    }

    function drag(event) {
        if (isDragging) {
            let clientX = event.clientX || event.touches[0].clientX;
            let clientY = event.clientY || event.touches[0].clientY;
            guiPanel.style.left = `${clientX - offsetX}px`;
            guiPanel.style.top = `${clientY - offsetY}px`;
            syncProperties(guiPanel);
        }
    }

    function stopDrag() {
        isDragging = false;
        guiPanel.style.cursor = 'grab';
    }

    guiPanel.addEventListener('mousedown', startDrag);
    guiPanel.addEventListener('touchstart', startDrag, { passive: true });
    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag, { passive: true });
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchend', stopDrag);
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

    // Добавляем физику только к панели в RunMenuPanel
    if (sourceSquare.dataset.rigidbody === 'true') {
        addRigidbody2D(square);
    }

    const runMenuBody = Bodies.rectangle(
        runMenuPanel.offsetLeft + runMenuPanel.clientWidth / 2,
        runMenuPanel.offsetTop + runMenuPanel.clientHeight / 2,
        runMenuPanel.clientWidth,
        runMenuPanel.clientHeight,
        { isStatic: true } // Делаем его неподвижным
    );
    World.add(world, runMenuBody);
    
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

    // Синхронизация Rigidbody2D
    if (sourceSquare.dataset.rigidbody === 'true') {
        if (!square.dataset.bodyId) {
            addRigidbody2D(square);
        }
    } else {
        if (square.dataset.bodyId) {
            removeRigidbody2D(square);
        }
    }
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
