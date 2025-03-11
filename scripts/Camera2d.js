let cameraCheckInterval = null; // Храним ID интервала

function UpdateCameraStatus() {
    const existingCamera = document.getElementById('camera-2d'); // Проверяем, есть ли камера
    const runMenuContent = document.querySelector('.RunMenu-content');
    const existingMessage = document.getElementById('camera-warning');

    if (existingCamera) {
        // Если камера есть, удаляем предупреждение
        if (existingMessage) {
            existingMessage.remove();
        }
        clearInterval(cameraCheckInterval); // Останавливаем проверку
        cameraCheckInterval = null;
    } else {
        if (!existingMessage) {
            // Если камеры нет, добавляем сообщение
            const message = document.createElement('div');
            message.id = 'camera-warning';
            message.innerText = 'Объект камера не найден на сцене';
            message.style.color = 'white';
            message.style.fontSize = '18px';
            message.style.textAlign = 'center';
            runMenuContent.appendChild(message);
        }
    }
}

function CreateCamera2d() {
    const scene = document.getElementById('RunMenuPanel');
    if (!document.getElementById('camera-2d')) {
        const camera = document.createElement('div');
        camera.id = 'camera-2d'; // Создаем камеру
        scene.appendChild(camera);
    }

    UpdateCameraStatus(); // Обновляем статус камеры
    document.getElementById('RunMenuPanel').style.display = 'block';
}

function CheckCamera2D() {
    if (!cameraCheckInterval) { 
        // Запускаем интервал только если он ещё не запущен
        cameraCheckInterval = setInterval(() => {
            UpdateCameraStatus();
            if (document.getElementById('camera-2d')) {
                clearInterval(cameraCheckInterval); // Если камера появилась, останавливаем интервал
                cameraCheckInterval = null;
            }
        }, 1000);
    }
}

// Запускаем проверку при старте
CheckCamera2D();
