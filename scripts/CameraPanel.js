// CameraMenu

document.addEventListener('keydown', function(event) {
    if (event.shiftKey && event.code === 'KeyC') {
        toggleCameraMenu();
    }
});

function toggleCameraMenu() {
    const UIMenu = document.getElementById('CameraMenu');
    if (UIMenu.style.display === 'flex') {
        closeCameraMenu();
    } else {
        openCameraMenu();
    }
}

function openCameraMenu() {
    const CameraMenu = document.getElementById('CameraMenu');
    CameraMenu.style.display = 'flex'; // Показываем панель
}

function closeCameraMenu() {
    const CameraMenu = document.getElementById('CameraMenu');
    CameraMenu.style.display = 'none'; // Скрываем панель
}