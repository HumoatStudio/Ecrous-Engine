document.addEventListener("DOMContentLoaded", () => {
    const fontSelect = document.getElementById("fonts");
    const fontInput = document.getElementById("customFontFile");
    const fontAlert = document.getElementById("fontAlert");

    // ✅ Загружаем сохранённый шрифт из localStorage
    const savedFont = localStorage.getItem("selectedFont") || "classic";
    fontSelect.value = savedFont;
    applyFont(savedFont);

    fontSelect.addEventListener("change", function () {
        const selectedFont = this.value;

        if (selectedFont === "classic") {
            fontAlert.style.display = "block"; // Показываем подсказку
            localStorage.setItem("selectedFont", "classic");

            // 🔄 Автоматическая перезагрузка через 2 секунды
            setTimeout(() => {
                location.reload();
            }, 2000);
        } 
        else if (selectedFont === "SelectCustom") {
            fontInput.click(); // Открыть окно загрузки файла
        } 
        else {
            applyFont(selectedFont);
            localStorage.setItem("selectedFont", selectedFont);
            fontAlert.style.display = "none"; // Прячем подсказку
        }
    });

    fontInput.addEventListener("change", function (event) {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const fontFace = new FontFace("CustomFont", `url(${e.target.result})`);
                fontFace.load().then((loadedFont) => {
                    document.fonts.add(loadedFont);
                    applyFont("CustomFont");
                    localStorage.setItem("selectedFont", "CustomFont");
                    localStorage.setItem("customFontData", e.target.result);
                });
            };
            reader.readAsDataURL(file);
        }
    });

    function applyFont(fontName) {
        console.log("Применяется шрифт:", fontName);
        document.body.style.fontFamily = fontName;
    }    

    // ✅ Восстанавливаем кастомный шрифт, если он был загружен
    if (savedFont === "CustomFont") {
        const fontData = localStorage.getItem("customFontData");
        if (fontData) {
            const fontFace = new FontFace("CustomFont", `url(${fontData})`);
            fontFace.load().then((loadedFont) => {
                document.fonts.add(loadedFont);
                applyFont("CustomFont");
            });
        }
    }
});
