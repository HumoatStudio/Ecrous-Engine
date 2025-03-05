function showPlus() {
    // Показываем элемент "plus-container"
    let plus = document.getElementById("plus-container");
    plus.style.display = "block";

    // Увеличиваем количество монет на 1
    coins += 1;

    // Обновляем счетчик монет на странице
    document.querySelector(".coin-counter").textContent = coins;

    // Скрываем элемент "plus-container" через 2 секунды
    setTimeout(() => {
        plus.style.display = "none";
    }, 2000);
}

// Запускаем функцию showPlus каждые 5 секунд
setInterval(showPlus, 120000);