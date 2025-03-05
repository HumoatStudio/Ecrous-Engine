//Темы

document.addEventListener("DOMContentLoaded", () => {
    const themeSelector = document.getElementById("ThemEditor");

    // Проверяем сохранённую тему
    const savedTheme = localStorage.getItem("editorTheme") || "Black";
    document.body.classList.add(savedTheme === "Black" ? "dark-theme" : "light-theme");
    themeSelector.value = savedTheme;

    // Смена темы
    themeSelector.addEventListener("change", (event) => {
        const selectedTheme = event.target.value;

        // Удаляем текущую тему
        document.body.classList.remove("dark-theme", "light-theme");

        // Применяем новую тему
        if (selectedTheme === "Black") {
            document.body.classList.add("dark-theme");
        } else if (selectedTheme === "White") {
            document.body.classList.add("light-theme");
        }

        // Сохраняем выбранную тему
        localStorage.setItem("editorTheme", selectedTheme);
    });
});
