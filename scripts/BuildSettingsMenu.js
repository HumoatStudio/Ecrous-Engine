//BuildSettingsMenu

function openBuildSettingsMenu() {
    const BuildSettingsMenuPanel = document.getElementById('BuildSettingsMenuPanel');
    BuildSettingsMenuPanel.style.display = 'flex'; // Показываем панель
}

function closeBuildSettingsMenu() {
    const BuildSettingsMenuPanel = document.getElementById('BuildSettingsMenuPanel');
    BuildSettingsMenuPanel.style.display = 'none'; // Скрываем панель
}

function saveJSON() {
    // Получаем значения из текстовых полей
    const name = document.getElementById('projectName').value || "MyProject";
    const packageName = document.getElementById('projectPackage').value || "com.myproject";
    const version = document.getElementById('projectVersion').value || "1.0.0";
    const author = document.getElementById('projectAuthor').value || "Your Name";
    const buildnum = document.getElementById('projectBuildNum').value || "1";

    // Создаем объект JSON
    const jsonData = {
        name: name,
        package: packageName,
        version: version,
        author: author,
        buildnum: buildnum
    };

    // Преобразуем объект в строку
    const jsonString = JSON.stringify(jsonData, null, 4);

    // Создаем файл для загрузки
    const blob = new Blob([jsonString], { type: "application/json" });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${name}.json`; // Имя файла совпадает с названием проекта
    link.click();
}
