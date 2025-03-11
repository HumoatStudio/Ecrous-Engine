//SpritesEditor

function openSpritesEditor() {
    const SpritesEditorPanel = document.getElementById('SpritesEditorPanel');
    SpritesEditorPanel.style.display = 'flex'; // Показываем панель
}

function closeSpritesEditor() {
    const SpritesEditorPanel = document.getElementById('SpritesEditorPanel');
    SpritesEditorPanel.style.display = 'none'; // Скрываем панель
}

document.getElementById('uploadSprite').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('spritePreview');
            preview.innerHTML = `<img src="${e.target.result}" alt="Sprite" style="max-width: 100%; max-height: 100%;">`;
        };
        reader.readAsDataURL(file);
    }
});