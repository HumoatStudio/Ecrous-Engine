// AIEditor

let keySequence = [];
const requiredKeys = ['Shift', 'KeyT', 'KeyA', 'KeyI'];

document.addEventListener('keydown', function(event) {
    if (event.key === 'Shift' || event.code === 'KeyT' || event.code === 'KeyA' || event.code === 'KeyI') {
        if (event.key === 'Shift' && keySequence.length === 0) {
            keySequence.push(event.key);
        } else if (keySequence.length > 0 && requiredKeys[keySequence.length] === event.code) {
            keySequence.push(event.code);
        } else {
            keySequence = [];
        }

        if (keySequence.length === requiredKeys.length) {
            toggleAIEditor();
            keySequence = []; // Сбрасываем последовательность
        }
    } else {
        keySequence = []; // Сбрасываем, если нажата другая клавиша
    }
});

function toggleAIEditor() {
    const AIEditorPanel = document.getElementById('AIEditorPanel');
    if (AIEditorPanel.style.display === 'flex') {
        closeAIEditor();
    } else {
        openAIEditor();
    }
}

function openAIEditor() {
    const AIEditorPanel = document.getElementById('AIEditorPanel');
    AIEditorPanel.style.display = 'flex'; // Показываем панель
}

function closeAIEditor() {
    const AIEditorPanel = document.getElementById('AIEditorPanel');
    AIEditorPanel.style.display = 'none'; // Скрываем панель
}

// Функция для обработки нажатия Enter
function handleEnter(event) {
    if (event.key === "Enter") {
        checkQuestion();
    }
}

// Функция для анимации печатания текста
function typeText(element, text, speed, callback) {
    let index = 0;
    const interval = setInterval(() => {
        element.textContent += text.charAt(index);
        index++;
        if (index === text.length) {
            clearInterval(interval);
            if (callback) callback();
        }
    }, speed);
}

// Функция для проверки вопроса и ответа
function checkQuestion() {
    const userQuestion = document.getElementById("userQuestion").value.toLowerCase();
    const userMessageContainer = document.getElementById("userMessageContainer");
    const aiMessageContainer = document.getElementById("AIMessageContainer");

    // Отправка сообщения пользователя
    const userMessage = document.createElement("p");
    userMessage.textContent = userQuestion;
    userMessageContainer.appendChild(userMessage);

    // Заглушка "думания" AI
    const aiThinkingMessage = document.createElement("p");
    aiThinkingMessage.textContent = "Подождите, я думаю...";
    aiMessageContainer.appendChild(aiThinkingMessage);

    // Загрузка JSON данных
    fetch('json/qa.json')
        .then(response => response.json())
        .then(data => {
            // Поиск ответа на основе вопроса
            const foundAnswer = data.questions.find(item => item.question.toLowerCase() === userQuestion);
            setTimeout(() => {
                aiThinkingMessage.textContent = ""; // Убираем "думающий" текст
                const aiAnswerMessage = document.createElement("p");

                if (foundAnswer) {
                    // Анимация печатания ответа
                    typeText(aiAnswerMessage, foundAnswer.answer, 100); // 10ms для каждого символа
                } else {
                    // Анимация печатания для ответа "не понимаю"
                    typeText(aiAnswerMessage, "Я не понимаю ваш вопрос.", 100);
                }

                aiMessageContainer.appendChild(aiAnswerMessage);
                document.getElementById("userQuestion").value = ""; // Очистка поля ввода
            }, 1500); // Задержка для эффекта "думания"
        })
        .catch(error => {
            console.error('Error loading QA data:', error);
            aiThinkingMessage.textContent = "Ошибка загрузки данных. Попробуйте позже.";
        });
}
