//NexLangScript

function openNexLangScript() {
    const NexLangScriptPanel = document.getElementById('NexLangScriptPanel');
    NexLangScriptPanel.style.display = 'flex'; // Показываем панель
}

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.ide-text-field-container');
    const dragHandle = document.querySelector('.drag-handle');
    const resizeCorner = document.querySelector('.resize-corner');
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

function closeNexLangScript() {
    const panel = document.getElementById("NexLangScriptPanel");
    if (panel) {
        panel.style.display = 'none';
    }
}

function processCode() {
    const codeInput = document.getElementById("codeInput").value.trim();
    const regex = /^CreateCircle\s+(\w+)\s+(\d+)\s+(\d+)\s+(\d+)$/;
    const match = codeInput.match(regex);

    if (match) {
        const name = match[1];        // Circle name
        const radius = parseInt(match[2], 10); // Radius
        const x = parseInt(match[3], 10); // X position
        const y = parseInt(match[4], 10); // Y position

        // Create the circle element
        const circle = document.createElement('div');
        circle.classList.add('circle');
        circle.style.width = `${radius * 2}px`;
        circle.style.height = `${radius * 2}px`;
        circle.style.left = `${x - radius}px`;
        circle.style.top = `${y - radius}px`;

        // Append the circle to the body (or a container)
        document.body.appendChild(circle);
        alert(`Circle "${name}" created at (${x}, ${y}) with radius ${radius}`);
    } else {
        alert("Invalid code. Please enter a valid command.");
    }
}

function processCode() {
    const codeInput = document.getElementById("codeInput").value.trim();
    const regex = /^CreateCircle\s+(\w+)\s+(\d+)\s+(\d+)\s+(\d+)$/;
    const match = codeInput.match(regex);

    if (match) {
        const name = match[1];        // Circle name
        const radius = parseInt(match[2], 10); // Radius
        const x = parseInt(match[3], 10); // X position
        const y = parseInt(match[4], 10); // Y position

        // Create the circle element
        const circle = document.createElement('div');
        circle.classList.add('circle');
        circle.style.width = `${radius * 2}px`;
        circle.style.height = `${radius * 2}px`;
        circle.style.left = `${x - radius}px`;
        circle.style.top = `${y - radius}px`;

        // Get the RunMenu content container
        const runMenuContent = document.querySelector('.RunMenu-content');
        if (runMenuContent) {
            // Append the circle to the RunMenu content
            runMenuContent.appendChild(circle);
        }

        alert(`Circle "${name}" created at (${x}, ${y}) with radius ${radius}`);
    } else {
        alert("Invalid code. Please enter a valid command.");
    }
}
