document.addEventListener('DOMContentLoaded', async function () {
    const codeEditor = document.getElementById('codeEditor');
    const runButton = document.getElementById('runButton');
    const outputDiv = document.getElementById('output');

    // Загружаем код из localStorage при загрузке страницы
    const savedCode = localStorage.getItem('pythonCode');
    if (savedCode) {
        codeEditor.value = savedCode;
    }

    // Сохраняем код в localStorage при изменении содержимого
    codeEditor.addEventListener('input', function () {
        localStorage.setItem('pythonCode', codeEditor.value);
    });

    // Загружаем Pyodide для выполнения Python кода
    const pyodide = await loadPyodide();

    // Функция для перехвата вывода print
    function captureOutput() {
        let output = '';
        pyodide.globals.set('print', (...args) => {
            output += args.join(' ') + '\n';
            outputDiv.textContent = output;
        });
    }

    // Загрузка нужных библиотек перед выполнением кода
    async function loadLibraries() {
        const requiredLibraries = ['numpy']; // Добавьте библиотеки по мере необходимости
        for (let lib of requiredLibraries) {
            await pyodide.loadPackage(lib);
        }
    }

    // Обработчик нажатия на кнопку "Запустить код"
    runButton.addEventListener('click', async function () {
        const code = codeEditor.value;
        outputDiv.textContent = ''; // Очищаем предыдущий вывод
        captureOutput(); // Перехватываем вывод
        try {
            await loadLibraries(); // Загружаем необходимые библиотеки
            await pyodide.runPythonAsync(code); // Выполняем Python код
        } catch (error) {
            outputDiv.textContent = "Ошибка: " + error;
        }
    });
});
