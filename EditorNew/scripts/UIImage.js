let imageIdCounter = 0;

function CreateUIImage() {
    const guiImage = document.createElement('img');
    guiImage.classList.add('image');
    guiImage.dataset.id = imageIdCounter++;
    guiImage.style.width = '500px';
    guiImage.style.height = '300px';
    guiImage.style.position = 'absolute';
    guiImage.style.left = `${window.innerWidth / 2 - 250}px`;
    guiImage.style.top = `${window.innerHeight / 2 - 150}px`;
    guiImage.style.cursor = 'grab';
    guiImage.style.zIndex = '1';
    // Устанавливаем изначальное изображение
    guiImage.src = 'https://i.postimg.cc/rmVzvMDw/tttt.png';
    
    document.body.appendChild(guiImage);
    
    CreateInRunMenuImage(guiImage);
    
    guiImage.addEventListener('mousedown', (event) => {
        if (currentMode === 'cursor' || currentMode === 'transform') {
            let startX = event.clientX;
            let startY = event.clientY;
            let startWidth = guiImage.offsetWidth;
            let startHeight = guiImage.offsetHeight;
            let startLeft = parseInt(guiImage.style.left, 10);
            let startTop = parseInt(guiImage.style.top, 10);

            const onMouseMove = (moveEvent) => {
                if (event.shiftKey) {
                    guiImage.style.width = `${startWidth + (moveEvent.clientX - startX)}px`;
                    guiImage.style.height = `${startHeight + (moveEvent.clientY - startY)}px`;
                } else {
                    guiImage.style.left = `${startLeft + (moveEvent.clientX - startX)}px`;
                    guiImage.style.top = `${startTop + (moveEvent.clientY - startY)}px`;
                }
                CreateInRunMenuImage(guiImage);
            };
            
            const onMouseUp = () => {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            };
            
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        }
    });

    guiImage.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        const contextMenu = document.createElement('div');
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
        
        const changeSrcOption = document.createElement('div');
        changeSrcOption.innerText = 'Изменить изображение (Файл)';
        changeSrcOption.style.cursor = 'pointer';
        changeSrcOption.style.padding = '5px';
        changeSrcOption.addEventListener('click', () => {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*';
            fileInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                        guiImage.src = ev.target.result;
                        applySrcToRunMenuImage(ev.target.result, guiImage.dataset.id);
                    };
                    reader.readAsDataURL(file);
                }
            });
            fileInput.click();
            contextMenu.remove();
        });
        
        const changeSrcUrlOption = document.createElement('div');
        changeSrcUrlOption.innerText = 'Изменить изображение (URL)';
        changeSrcUrlOption.style.cursor = 'pointer';
        changeSrcUrlOption.style.padding = '5px';
        changeSrcUrlOption.addEventListener('click', () => {
            const url = prompt('Введите URL изображения:');
            if (url) {
                guiImage.src = url;
                applySrcToRunMenuImage(url, guiImage.dataset.id);
            }
            contextMenu.remove();
        });
        
        const changeSizeOption = document.createElement('div');
        changeSizeOption.innerText = 'Изменить размер (px)';
        changeSizeOption.style.cursor = 'pointer';
        changeSizeOption.style.padding = '5px';
        changeSizeOption.addEventListener('click', () => {
            const newWidth = prompt('Введите ширину (px):', guiImage.style.width.replace('px', ''));
            const newHeight = prompt('Введите высоту (px):', guiImage.style.height.replace('px', ''));
            if (newWidth && newHeight) {
                guiImage.style.width = `${newWidth}px`;
                guiImage.style.height = `${newHeight}px`;
                CreateInRunMenuImage(guiImage);
            }
            contextMenu.remove();
        });

        const changeBorderRadiusOption = document.createElement('div');
        changeBorderRadiusOption.innerText = 'Изменить закругление углов';
        changeBorderRadiusOption.style.cursor = 'pointer';
        changeBorderRadiusOption.style.padding = '5px';
        changeBorderRadiusOption.addEventListener('click', () => {
            const newRadius = prompt('Введите радиус закругления (px):', guiImage.style.borderRadius.replace('px', ''));
            if (newRadius !== null) {
                guiImage.style.borderRadius = `${newRadius}px`;
            }
            contextMenu.remove();
        });

        const deleteOption = document.createElement('div');
        deleteOption.innerText = 'Удалить изображение';
        deleteOption.style.cursor = 'pointer';
        deleteOption.style.padding = '5px';
        deleteOption.style.color = 'red';
        deleteOption.addEventListener('click', () => {
            guiImage.remove();
            removeFromRunMenu(guiImage.dataset.id);
            contextMenu.remove();
        });

        contextMenu.appendChild(deleteOption);
        
        document.addEventListener('click', () => contextMenu.remove(), { once: true });
        document.body.appendChild(contextMenu);
        
        contextMenu.appendChild(changeSrcOption);
        contextMenu.appendChild(changeSrcUrlOption);
        contextMenu.appendChild(changeSizeOption);
        contextMenu.appendChild(changeBorderRadiusOption);
        contextMenu.appendChild(deleteOption);
        
        document.addEventListener('click', () => contextMenu.remove(), { once: true });
        document.body.appendChild(contextMenu);
    });
}

function CreateInRunMenuImage(sourceImage) {
    const runMenuPanel = document.getElementById('RunMenuPanel');
    const runMenuContent = runMenuPanel.querySelector('.RunMenu-content');
    
    let image = runMenuContent.querySelector(`.image[data-id="${sourceImage.dataset.id}"]`);
    
    if (!image) {
        image = document.createElement('img');
        image.classList.add('image');
        image.dataset.id = sourceImage.dataset.id;
        runMenuContent.appendChild(image);
    }
    
    image.src = sourceImage.src;
    image.style.width = sourceImage.style.width;
    image.style.height = sourceImage.style.height;
    image.style.position = 'absolute';
    image.style.left = sourceImage.style.left;
    image.style.top = sourceImage.style.top;
    image.style.transform = sourceImage.style.transform;
    image.style.borderRadius = sourceImage.style.borderRadius;
}

function applySrcToRunMenuImage(newSrc, imageId) {
    const runMenuPanel = document.getElementById('RunMenuPanel');
    const runMenuContent = runMenuPanel.querySelector('.RunMenu-content');
    let image = runMenuContent.querySelector(`.image[data-id="${imageId}"]`);
    if (image) {
        image.src = newSrc;
    }
}

function removeFromRunMenu(imageId) {
    const runMenuPanel = document.getElementById('RunMenuPanel');
    const runMenuContent = runMenuPanel.querySelector('.RunMenu-content');
    let image = runMenuContent.querySelector(`.image[data-id="${imageId}"]`);
    if (image) {
        image.remove();
    }
}