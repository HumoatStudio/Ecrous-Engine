// Основные элементы
const backButton = document.querySelector('.back-button');
const plusButton = document.querySelector('.plus-button');
const blockMenu = document.querySelector('.block-menu');
const dropArea = document.getElementById('dropArea');

// Массив для хранения блоков
let blocks = [];

// Установите цвет фона для меню блоков
blockMenu.style.backgroundColor = '#696969'; // Светло-серый цвет
blockMenu.style.padding = '10px'; // Отступы
blockMenu.style.borderRadius = '5px'; // Скругление углов

// Показать/скрыть меню
plusButton.addEventListener('click', () => {
    blockMenu.style.display = blockMenu.style.display === 'none' || blockMenu.style.display === '' ? 'block' : 'none';
});

// Обработчик событий для блоков в меню
const blockItems = document.querySelectorAll('.block-menu li');
blockItems.forEach(item => {
    item.addEventListener('click', (e) => {
        const blockType = e.target.dataset.block;
        createBlock(blockType); // Вызов функции создания блока
        blockMenu.style.display = 'none'; // Скрываем меню после выбора
    });
});

// Функция создания блока
function createBlock(blockType) {
    const newBlock = document.createElement('div');
    newBlock.classList.add('draggable-block');
    newBlock.textContent = blockType;

    // Создаем кнопку удаления
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить';
    deleteButton.classList.add('delete-button'); // Добавляем класс для кнопки удаления
    deleteButton.onclick = () => {
        dropArea.removeChild(newBlock); // Удаляем блок из области
        blocks = blocks.filter(block => block !== newBlock); // Обновляем массив блоков
    };

    const blockWidth = 380; // Ширина блока
    newBlock.style.width = blockWidth + 'px'; // Устанавливаем ширину блока
    newBlock.style.position = 'absolute'; // Устанавливаем позицию блока как абсолютную

    // Устанавливаем градиент для блока
    if (blockType === 'При старте') {
        newBlock.style.backgroundImage = "url('Blocks/При Старте.png')";
        newBlock.style.backgroundSize = 'cover'; // Настройка изображения
    } else {
        newBlock.style.background = "linear-gradient(to right, #ff7e5f, #feb47b)"; // Градиент по умолчанию
    }

    // Определяем позицию нового блока
    let topPosition = 20; // Начальная позиция сверху
    if (blocks.length > 0) {
        const lastBlock = blocks[blocks.length - 1]; // Последний созданный блок
        topPosition = lastBlock.offsetTop + lastBlock.offsetHeight + 10; // Расстояние между блоками 10px
    }

    newBlock.style.top = topPosition + 'px';
    newBlock.style.left = (dropArea.clientWidth - blockWidth) / 2 + 'px'; // Центрируем по X

    newBlock.appendChild(deleteButton); // Добавляем кнопку удаления к блоку
    dropArea.appendChild(newBlock); // Добавляем блок в область
    blocks.push(newBlock); // Сохраняем блок в массив
}

// Функция для прокрутки вниз, чтобы показывать новые блоки
function scrollDown() {
    dropArea.scrollTop = dropArea.scrollHeight;
}

// Обновляем позицию каждого блока при прокрутке
dropArea.addEventListener('scroll', () => {
    blocks.forEach((block, index) => {
        const blockWidth = 380; // Ширина блока
        const topPosition = 20 + (index * (block.offsetHeight + 10));
        block.style.top = topPosition + 'px';
        block.style.left = (dropArea.clientWidth - blockWidth) / 2 + 'px'; // Центрируем по X
    });
});
