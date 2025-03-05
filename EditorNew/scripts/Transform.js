//Transform

// Global variables
let currentMode = null; // Current active mode
let selectedElement = null; // Active object for interaction
let isDragging = false; // Dragging flag
let offsetX = 0; // X offset
let offsetY = 0; // Y offset
let isRotating = false; // Rotation flag
let initialAngle = 0; // Initial angle for rotation
let initialMouseX = 0; // Initial mouse X position for rotation
let initialMouseY = 0; // Initial mouse Y position for rotation
let isScaling = false; // Scaling flag
let initialWidth = 0; // Initial width for scaling
let initialHeight = 0; // Initial height for scaling
let scaleDirection = ''; // Direction of scaling

// Enable cursor mode
function enableCursorMode() {
    if (currentMode === 'cursor') return;

    disableCurrentMode();
    currentMode = 'cursor';

    document.querySelector('.Cursor').style.backgroundColor = 'lightblue';
    document.querySelector('.Transform').style.backgroundColor = '';

    document.getElementById('panel').addEventListener('mousedown', startDraggingCursor);
    document.addEventListener('mouseup', stopDraggingCursor);
    document.addEventListener('mousemove', dragCursor);
}

// Enable transform mode
function enableTransformMode() {
    if (currentMode === 'transform') return;

    disableCurrentMode();
    currentMode = 'transform';

    document.querySelector('.Transform').style.backgroundColor = 'lightblue';
    document.querySelector('.Cursor').style.backgroundColor = '';

    if (selectedElement) {
        createTransformArrows(selectedElement);
    }

    document.addEventListener('keydown', moveWithArrows);
}

// Enable rotate mode
function enableRotateMode() {
    if (currentMode === 'rotate') return;

    disableCurrentMode();
    currentMode = 'rotate';

    document.querySelector('.Rotate').style.backgroundColor = 'lightblue';
    document.querySelector('.Cursor').style.backgroundColor = '';

    if (selectedElement) {
        createRotateCircle(selectedElement);
    }

    document.addEventListener('mousedown', startRotation);
    document.addEventListener('mousemove', rotateElement);
    document.addEventListener('mouseup', stopRotation);
}

// Enable scale mode
function enableScaleMode() {
    if (currentMode === 'scale') return;

    disableCurrentMode();
    currentMode = 'scale';

    document.querySelector('.Scale').style.backgroundColor = 'lightblue';
    document.querySelector('.Cursor').style.backgroundColor = '';

    if (selectedElement) {
        createScaleHandles(selectedElement);
    }
}

// Create transform arrows
function createTransformArrows(element) {
    const arrowContainer = document.createElement('div');
    arrowContainer.classList.add('arrow-container');
    arrowContainer.style.position = 'relative';

    const arrowX = document.createElement('div');
    arrowX.classList.add('arrow', 'arrow-x');
    arrowX.style.backgroundColor = 'red';
    arrowX.style.position = 'absolute';
    arrowX.style.width = '20px';
    arrowX.style.height = '20px';
    arrowX.style.top = '50%';
    arrowX.style.right = '-10px';
    arrowX.style.cursor = 'pointer';

    const arrowY = document.createElement('div');
    arrowY.classList.add('arrow', 'arrow-y');
    arrowY.style.backgroundColor = 'green';
    arrowY.style.position = 'absolute';
    arrowY.style.width = '20px';
    arrowY.style.height = '20px';
    arrowY.style.bottom = '-10px';
    arrowY.style.left = '50%';
    arrowY.style.transform = 'translateX(-50%)';
    arrowY.style.cursor = 'pointer';

    element.appendChild(arrowContainer);
    arrowContainer.appendChild(arrowX);
    arrowContainer.appendChild(arrowY);

    arrowX.addEventListener('mousedown', (event) => {
        event.preventDefault();
        isDragging = true;
        offsetX = event.clientX - element.getBoundingClientRect().left;
    });

    arrowY.addEventListener('mousedown', (event) => {
        event.preventDefault();
        isDragging = true;
        offsetY = event.clientY - element.getBoundingClientRect().top;
    });

    document.addEventListener('mousemove', (event) => {
        if (!isDragging) return;

        if (event.target === arrowX) {
            const parentRect = element.parentElement.getBoundingClientRect();
            let newLeft = event.clientX - parentRect.left - offsetX;
            newLeft = Math.max(0, Math.min(newLeft, parentRect.width - element.offsetWidth));
            element.style.left = `${newLeft}px`;
        }

        if (event.target === arrowY) {
            const parentRect = element.parentElement.getBoundingClientRect();
            let newTop = event.clientY - parentRect.top - offsetY;
            newTop = Math.max(0, Math.min(newTop, parentRect.height - element.offsetHeight));
            element.style.top = `${newTop}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
}

// Create rotate circle
function createRotateCircle(element) {
    const rotateCircle = document.createElement('div');
    rotateCircle.classList.add('rotate-circle');
    rotateCircle.style.position = 'absolute';
    rotateCircle.style.width = '30px';
    rotateCircle.style.height = '30px';
    rotateCircle.style.borderRadius = '50%';
    rotateCircle.style.border = '2px solid blue';
    rotateCircle.style.cursor = 'pointer';
    rotateCircle.style.top = `${element.offsetTop - 20}px`;
    rotateCircle.style.left = `${element.offsetLeft + element.offsetWidth - 15}px`;

    element.parentElement.appendChild(rotateCircle);
}

// Create scale handles
function createScaleHandles(element) {
    const handlePositions = ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'];
    const handleContainer = document.createElement('div');
    handleContainer.classList.add('scale-handles');
    
    handlePositions.forEach(position => {
        const handle = document.createElement('div');
        handle.classList.add('scale-handle', `scale-handle-${position}`);
        handle.style.position = 'absolute';
        handle.style.width = '10px';
        handle.style.height = '10px';
        handle.style.backgroundColor = '#0066cc';
        handle.style.cursor = getCursorStyle(position);

        // Position the handle
        switch(position) {
            case 'nw': 
                handle.style.top = '-5px';
                handle.style.left = '-5px';
                break;
            case 'n':
                handle.style.top = '-5px';
                handle.style.left = '50%';
                handle.style.transform = 'translateX(-50%)';
                break;
            case 'ne':
                handle.style.top = '-5px';
                handle.style.right = '-5px';
                break;
            case 'e':
                handle.style.top = '50%';
                handle.style.right = '-5px';
                handle.style.transform = 'translateY(-50%)';
                break;
            case 'se':
                handle.style.bottom = '-5px';
                handle.style.right = '-5px';
                break;
            case 's':
                handle.style.bottom = '-5px';
                handle.style.left = '50%';
                handle.style.transform = 'translateX(-50%)';
                break;
            case 'sw':
                handle.style.bottom = '-5px';
                handle.style.left = '-5px';
                break;
            case 'w':
                handle.style.top = '50%';
                handle.style.left = '-5px';
                handle.style.transform = 'translateY(-50%)';
                break;
        }

        handle.addEventListener('mousedown', (e) => {
            startScaling(e, position);
        });

        element.appendChild(handle);
    });

    document.addEventListener('mousemove', scaleElement);
    document.addEventListener('mouseup', stopScaling);
}

// Get cursor style for scale handles
function getCursorStyle(position) {
    const cursorStyles = {
        'nw': 'nw-resize',
        'n': 'n-resize',
        'ne': 'ne-resize',
        'e': 'e-resize',
        'se': 'se-resize',
        's': 's-resize',
        'sw': 'sw-resize',
        'w': 'w-resize'
    };
    return cursorStyles[position];
}

// Start rotation
function startRotation(event) {
    if (currentMode !== 'rotate' || !selectedElement) return;

    const rect = selectedElement.getBoundingClientRect();
    initialMouseX = event.clientX;
    initialMouseY = event.clientY;

    const elementCenterX = rect.left + rect.width / 2;
    const elementCenterY = rect.top + rect.height / 2;

    initialAngle = Math.atan2(event.clientY - elementCenterY, event.clientX - elementCenterX) * 180 / Math.PI;

    isRotating = true;
    event.preventDefault();
}

// Rotate element
function rotateElement(event) {
    if (!isRotating || currentMode !== 'rotate' || !selectedElement) return;

    const rect = selectedElement.getBoundingClientRect();
    const elementCenterX = rect.left + rect.width / 2;
    const elementCenterY = rect.top + rect.height / 2;

    const angle = Math.atan2(event.clientY - elementCenterY, event.clientX - elementCenterX) * 180 / Math.PI;
    const rotation = angle - initialAngle;

    selectedElement.style.transform = `rotate(${rotation}deg)`;
}

// Stop rotation
function stopRotation() {
    if (isRotating) {
        isRotating = false;
        selectedElement = null;
    }
}

// Start scaling
function startScaling(event, direction) {
    if (currentMode !== 'scale' || !selectedElement) return;

    isScaling = true;
    scaleDirection = direction;
    initialWidth = selectedElement.offsetWidth;
    initialHeight = selectedElement.offsetHeight;
    
    const rect = selectedElement.getBoundingClientRect();
    offsetX = event.clientX - rect.left;
    offsetY = event.clientY - rect.top;

    event.preventDefault();
}

// Scale element
function scaleElement(event) {
    if (!isScaling || currentMode !== 'scale' || !selectedElement) return;

    const rect = selectedElement.getBoundingClientRect();
    const deltaX = event.clientX - (rect.left + offsetX);
    const deltaY = event.clientY - (rect.top + offsetY);

    let newWidth = initialWidth;
    let newHeight = initialHeight;

    switch(scaleDirection) {
        case 'e':
            newWidth = initialWidth + deltaX;
            break;
        case 'w':
            newWidth = initialWidth - deltaX;
            break;
        case 's':
            newHeight = initialHeight + deltaY;
            break;
        case 'n':
            newHeight = initialHeight - deltaY;
            break;
        case 'se':
            newWidth = initialWidth + deltaX;
            newHeight = initialHeight + deltaY;
            break;
        case 'sw':
            newWidth = initialWidth - deltaX;
            newHeight = initialHeight + deltaY;
            break;
        case 'ne':
            newWidth = initialWidth + deltaX;
            newHeight = initialHeight - deltaY;
            break;
        case 'nw':
            newWidth = initialWidth - deltaX;
            newHeight = initialHeight - deltaY;
            break;
    }

    // Apply minimum size constraints
    newWidth = Math.max(20, newWidth);
    newHeight = Math.max(20, newHeight);

    selectedElement.style.width = `${newWidth}px`;
    selectedElement.style.height = `${newHeight}px`;
}

// Stop scaling
function stopScaling() {
    isScaling = false;
    scaleDirection = '';
}

// Disable current mode
function disableCurrentMode() {
    if (currentMode === 'cursor') {
        document.getElementById('panel').removeEventListener('mousedown', startDraggingCursor);
        document.removeEventListener('mouseup', stopDraggingCursor);
        document.removeEventListener('mousemove', dragCursor);
    } else if (currentMode === 'transform') {
        document.removeEventListener('keydown', moveWithArrows);
    } else if (currentMode === 'rotate') {
        document.removeEventListener('mousedown', startRotation);
        document.removeEventListener('mousemove', rotateElement);
        document.removeEventListener('mouseup', stopRotation);
    } else if (currentMode === 'scale') {
        document.removeEventListener('mousemove', scaleElement);
        document.removeEventListener('mouseup', stopScaling);
        const handles = document.querySelectorAll('.scale-handle');
        handles.forEach(handle => handle.remove());
    }

    resetHighlight();
    currentMode = null;
    selectedElement = null;
    isDragging = false;
    isRotating = false;
    isScaling = false;
}

// Start dragging cursor
function startDraggingCursor(event) {
    if (currentMode !== 'cursor') return;

    const target = event.target;
    if (!target.classList.contains('square')) return;

    selectedElement = target;
    isDragging = true;

    const rect = selectedElement.getBoundingClientRect();
    offsetX = event.clientX - rect.left;
    offsetY = event.clientY - rect.top;

    event.preventDefault();
}

// Drag cursor (continued)
function dragCursor(event) {
    if (!isDragging || currentMode !== 'cursor' || !selectedElement) return;

    const parentRect = selectedElement.parentElement.getBoundingClientRect();

    let newLeft = event.clientX - parentRect.left - offsetX;
    let newTop = event.clientY - parentRect.top - offsetY;

    newLeft = Math.max(0, Math.min(newLeft, parentRect.width - selectedElement.offsetWidth));
    newTop = Math.max(0, Math.min(newTop, parentRect.height - selectedElement.offsetHeight));

    selectedElement.style.left = `${newLeft}px`;
    selectedElement.style.top = `${newTop}px`;

    // Ищем соответствующий объект в RunMenuPanel и обновляем его позицию
    const runMenuPanel = document.getElementById('RunMenuPanel');
    const runMenuContent = runMenuPanel.querySelector('.RunMenu-content');
    const mirroredSquare = runMenuContent.querySelector('.square'); // Предполагаем, что там только один

    if (mirroredSquare) {
        mirroredSquare.style.left = `${newLeft}px`;
        mirroredSquare.style.top = `${newTop}px`;
    }
}

// Stop dragging cursor
function stopDraggingCursor() {
    isDragging = false;
    selectedElement = null;
}

// Move with arrows
function moveWithArrows(event) {
    if (!selectedElement || currentMode !== 'transform') return;

    const step = 5;
    switch (event.key) {
        case 'ArrowLeft':
            selectedElement.style.left = `${parseInt(selectedElement.style.left || 0) - step}px`;
            break;
        case 'ArrowRight':
            selectedElement.style.left = `${parseInt(selectedElement.style.left || 0) + step}px`;
            break;
        case 'ArrowUp':
            selectedElement.style.top = `${parseInt(selectedElement.style.top || 0) - step}px`;
            break;
        case 'ArrowDown':
            selectedElement.style.top = `${parseInt(selectedElement.style.top || 0) + step}px`;
            break;
    }
}

// Reset highlight
function resetHighlight() {
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
        square.style.border = '';
    });
}
