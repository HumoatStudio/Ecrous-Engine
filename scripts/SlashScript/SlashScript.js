//SlashScript

function openSlashScript() {
    const SlashScriptPanel = document.getElementById('SlashScriptPanel');
    SlashScriptPanel.style.display = 'flex'; // Показываем панель
}

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.ide-text-field-container-sls');
    const dragHandle = document.querySelector('.drag-handle-sls');
    const resizeCorner = document.querySelector('.resize-corner-sls');
    let isDragging = false;
    let isResizing = false;
    let offsetX, offsetY, startWidth, startHeight;

    dragHandle.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - container.offsetLeft;
        offsetY = e.clientY - container.offsetTop;
    });

    resizeCorner.addEventListener('mousedown', (e) => {
        isResizing = true;
        startWidth = container.offsetWidth;
        startHeight = container.offsetHeight;
        offsetX = e.clientX;
        offsetY = e.clientY;
        e.stopPropagation();
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            container.style.left = `${e.clientX - offsetX}px`;
            container.style.top = `${e.clientY - offsetY}px`;
        } else if (isResizing) {
            container.style.width = `${startWidth + (e.clientX - offsetX)}px`;
            container.style.height = `${startHeight + (e.clientY - offsetY)}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        isResizing = false;
    });
});

function closeSlashScript() {
    const SlashScriptPanel = document.getElementById('SlashScriptPanel');
    SlashScriptPanel.style.display = 'none'; // Скрываем панель
}
