let mediaIdCounter = 0;

function CreateUIVideo() {
    const guiVideo = document.createElement('video');
    guiVideo.classList.add('video');
    guiVideo.dataset.id = mediaIdCounter++;
    guiVideo.style.width = '500px';
    guiVideo.style.height = '300px';
    guiVideo.style.position = 'absolute';
    guiVideo.style.left = `${window.innerWidth / 2 - 250}px`;
    guiVideo.style.top = `${window.innerHeight / 2 - 150}px`;
    guiVideo.style.cursor = 'grab';
    guiVideo.style.zIndex = '1';
    guiVideo.controls = true;
    guiVideo.src = 'your-video-url.mp4';
    
    document.body.appendChild(guiVideo);
    
    CreateInRunMenuVideo(guiVideo);
    
    guiVideo.addEventListener('mousedown', (event) => {
        if (currentMode === 'cursor' || currentMode === 'transform') {
            let startX = event.clientX;
            let startY = event.clientY;
            let startWidth = guiVideo.offsetWidth;
            let startHeight = guiVideo.offsetHeight;
            let startLeft = parseInt(guiVideo.style.left, 10);
            let startTop = parseInt(guiVideo.style.top, 10);

            const onMouseMove = (moveEvent) => {
                if (event.shiftKey) {
                    guiVideo.style.width = `${startWidth + (moveEvent.clientX - startX)}px`;
                    guiVideo.style.height = `${startHeight + (moveEvent.clientY - startY)}px`;
                } else {
                    guiVideo.style.left = `${startLeft + (moveEvent.clientX - startX)}px`;
                    guiVideo.style.top = `${startTop + (moveEvent.clientY - startY)}px`;
                }
                CreateInRunMenuVideo(guiVideo);
            };
            
            const onMouseUp = () => {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            };
            
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        }
    });

    guiVideo.addEventListener('contextmenu', (event) => {
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
        changeSrcOption.innerText = 'Изменить видео (Файл)';
        changeSrcOption.style.cursor = 'pointer';
        changeSrcOption.style.padding = '5px';
        changeSrcOption.addEventListener('click', () => {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'video/*';
            fileInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                        guiVideo.src = ev.target.result;
                        applySrcToRunMenuVideo(ev.target.result, guiVideo.dataset.id);
                    };
                    reader.readAsDataURL(file);
                }
            });
            fileInput.click();
            contextMenu.remove();
        });
        
        const changeSrcUrlOption = document.createElement('div');
        changeSrcUrlOption.innerText = 'Изменить видео (URL)';
        changeSrcUrlOption.style.cursor = 'pointer';
        changeSrcUrlOption.style.padding = '5px';
        changeSrcUrlOption.addEventListener('click', () => {
            const url = prompt('Введите URL видео:');
            if (url) {
                guiVideo.src = url;
                applySrcToRunMenuVideo(url, guiVideo.dataset.id);
            }
            contextMenu.remove();
        });
        
        const changeSizeOption = document.createElement('div');
        changeSizeOption.innerText = 'Изменить размер (px)';
        changeSizeOption.style.cursor = 'pointer';
        changeSizeOption.style.padding = '5px';
        changeSizeOption.addEventListener('click', () => {
            const newWidth = prompt('Введите ширину (px):', guiVideo.style.width.replace('px', ''));
            const newHeight = prompt('Введите высоту (px):', guiVideo.style.height.replace('px', ''));
            if (newWidth && newHeight) {
                guiVideo.style.width = `${newWidth}px`;
                guiVideo.style.height = `${newHeight}px`;
                CreateInRunMenuVideo(guiVideo);
            }
            contextMenu.remove();
        });
        
        contextMenu.appendChild(changeSrcOption);
        contextMenu.appendChild(changeSrcUrlOption);
        contextMenu.appendChild(changeSizeOption);
        
        document.addEventListener('click', () => contextMenu.remove(), { once: true });
        document.body.appendChild(contextMenu);
    });
}

function CreateInRunMenuVideo(sourceVideo) {
    const runMenuPanel = document.getElementById('RunMenuPanel');
    const runMenuContent = runMenuPanel.querySelector('.RunMenu-content');
    
    let video = runMenuContent.querySelector(`.video[data-id="${sourceVideo.dataset.id}"]`);
    
    if (!video) {
        video = document.createElement('video');
        video.classList.add('video');
        video.dataset.id = sourceVideo.dataset.id;
        video.controls = true;
        runMenuContent.appendChild(video);
    }
    
    video.src = sourceVideo.src;
    video.style.width = sourceVideo.style.width;
    video.style.height = sourceVideo.style.height;
    video.style.position = 'absolute';
    video.style.left = sourceVideo.style.left;
    video.style.top = sourceVideo.style.top;
    video.style.transform = sourceVideo.style.transform;
}

function applySrcToRunMenuVideo(newSrc, videoId) {
    const runMenuPanel = document.getElementById('RunMenuPanel');
    const runMenuContent = runMenuPanel.querySelector('.RunMenu-content');
    let video = runMenuContent.querySelector(`.video[data-id="${videoId}"]`);
    if (video) {
        video.src = newSrc;
    }
}
