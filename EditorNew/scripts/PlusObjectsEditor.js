// PlusObjectsEditor

document.addEventListener('keydown', function(event) {
    if (event.shiftKey && event.code === 'KeyA') {
        togglePlusObjectsEditor();
    }
});

function togglePlusObjectsEditor() {
    const PlusObjectsEditorPanel = document.getElementById('PlusObjectsEditorPanel');
    if (PlusObjectsEditorPanel.style.display === 'flex') {
        closePlusObjectsEditor();
    } else {
        openPlusObjectsEditor();
    }
}

function openPlusObjectsEditor() {
    const PlusObjectsEditorPanel = document.getElementById('PlusObjectsEditorPanel');
    PlusObjectsEditorPanel.style.display = 'flex'; // Показываем панель
}

function closePlusObjectsEditor() {
    const PlusObjectsEditorPanel = document.getElementById('PlusObjectsEditorPanel');
    PlusObjectsEditorPanel.style.display = 'none'; // Скрываем панель
}
