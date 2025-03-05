document.addEventListener("DOMContentLoaded", () => {
    // Проверяем, нет ли уже загрузчика
    if (document.getElementById("loader")) return;

    // Создаем элемент загрузки
    const loader = document.createElement("div");
    loader.id = "loader";
    loader.className = "loader";
    loader.innerHTML = `
        <div class="loader-content">
            <img src="sprites/app.jpg" alt="Ecrous Engine" class="engine-image">
            <h1 data-translate="loadingTitle">Загружаем Ecrous Engine...</h1>
            <p data-translate="loadingMessage">Не переживайте, все готово будет через пару секунд!</p>
        </div>
        <div class="spinner"></div>
    `;

    // Добавляем в начало body
    document.body.prepend(loader);

    // Убираем загрузчик после загрузки страницы
    window.addEventListener("load", () => {
        setTimeout(() => {
            loader.style.opacity = "0";
            setTimeout(() => loader.remove(), 500); // Полностью убираем после анимации
        }, 5000);
    });
});
