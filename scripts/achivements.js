//Achivements

function openAchivements() {
    const AchivementsPanel = document.getElementById('AchivementsPanel');
    AchivementsPanel.style.display = 'flex'; // Показываем панель
}

function closeAchivements() {
    const AchivementsPanel = document.getElementById('AchivementsPanel');
    AchivementsPanel.style.display = 'none'; // Скрываем панель
}

document.addEventListener("DOMContentLoaded", function() {
    // Проверяем, было ли достижение "Начало" уже разблокировано
    const isAchievementUnlocked = localStorage.getItem('achievement1') === 'unlocked';

    // Если достижение еще не разблокировано, разблокируем его
    if (!isAchievementUnlocked) {
        unlockAchievement('achievement1');
        localStorage.setItem('achievement1', 'unlocked'); // Сохраняем состояние достижения

        // Показываем уведомление через 6 секунд
        setTimeout(() => {
            showNotification('Начало');
        }, 6000); // 6000 мс = 6 секунд
    } else {
        // Если достижение уже разблокировано, просто отображаем его как разблокированное
        const achievement = document.getElementById('achievement1');
        if (achievement) {
            achievement.classList.add('unlocked');
            const status = achievement.querySelector('.status');
            status.textContent = '✅ Разблокировано';
        }
    }

    // Обработчик для кнопки сброса достижений
    const resetButton = document.getElementById('reset-button');
    if (resetButton) {
        resetButton.addEventListener('click', resetAchievements);
    }
});

// Функция для разблокировки достижения
function unlockAchievement(achievementId) {
    const achievement = document.getElementById(achievementId);
    if (achievement) {
        achievement.classList.add('unlocked');
        const status = achievement.querySelector('.status');
        status.textContent = '✅ Разблокировано';
    }
}

// Функция для показа уведомления
function showNotification(achievementName) {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notification-text');

    if (notification && notificationText) {
        notificationText.textContent = achievementName; // Устанавливаем текст уведомления
        notification.classList.remove('hidden');
        notification.classList.add('visible');

        // Скрываем уведомление через 5 секунд
        setTimeout(() => {
            notification.classList.remove('visible');
            notification.classList.add('hidden');
        }, 5000); // 5000 мс = 5 секунд
    }
}

// Функция для сброса достижений
function resetAchievements() {
    // Очищаем localStorage
    localStorage.removeItem('achievement1');

    // Сбрасываем состояние достижения на странице
    const achievement = document.getElementById('achievement1');
    if (achievement) {
        achievement.classList.remove('unlocked');
        const status = achievement.querySelector('.status');
        status.textContent = '🔒 Заблокировано';
    }

    alert('Достижения сброшены!');
}
