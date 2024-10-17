document.addEventListener('DOMContentLoaded', function () {
    const codeEditor = document.getElementById('codeEditor');
    const runButton = document.getElementById('runButton');
    const outputDiv = document.getElementById('output');

    // Загружаем код из localStorage при загрузке страницы
    const savedCode = localStorage.getItem('javaCode');
    if (savedCode) {
        codeEditor.value = savedCode;
    }

    // Сохраняем код в localStorage при изменении содержимого
    codeEditor.addEventListener('input', function () {
        localStorage.setItem('javaCode', codeEditor.value);
    });

    // Обработчик нажатия на кнопку "Запустить код"
    runButton.addEventListener('click', async function () {
        const code = codeEditor.value;
        outputDiv.textContent = ''; // Очищаем предыдущий вывод

        // Настройка запроса к JDoodle API
        const requestData = {
            script: code,
            language: "java",
            versionIndex: "3", // Указание версии Java
            clientId: "ВАШ_ID", // Введите свой clientId, который можно получить после регистрации на JDoodle
            clientSecret: "ВАШ_SECRET", // Введите свой clientSecret
        };

        try {
            const response = await fetch('https://api.jdoodle.com/v1/execute', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            const result = await response.json();

            // Вывод результата выполнения кода
            if (result.output) {
                outputDiv.textContent = result.output;
            } else {
                outputDiv.textContent = "Ошибка выполнения кода.";
            }
        } catch (error) {
            outputDiv.textContent = "Ошибка: " + error;
        }
    });
});
