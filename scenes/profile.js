// Получаем элементы из DOM
const circle = document.querySelector('.circle');
const usernameDisplay = document.querySelector('.username');
const changeNameButton = document.querySelector('.change-name-button');
const nameInput = document.querySelector('.name-input');
const subscribeButton = document.querySelector('.subscribe-button');
const modal = document.querySelector('.modal');
const closeModalButton = document.querySelector('.close');
const activationMessage = document.getElementById('activationMessage'); // Сообщение о подписке

// Функция для генерации случайного ника
function generateRandomNickname() {
    const nicknames = ['User123', '777', 'CoolCat', 'Guest228', 'Ecrous Engine'];
    return nicknames[Math.floor(Math.random() * nicknames.length)];
}

// Функция для загрузки имени пользователя из localStorage или генерации случайного
function loadUsername() {
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
        return savedUsername; // Возвращаем сохраненное имя, если оно есть
    } else {
        const randomUsername = generateRandomNickname();
        localStorage.setItem('username', randomUsername); // Сохраняем случайный ник
        return randomUsername;
    }
}

// Функция для сохранения имени пользователя
function saveUsername(username) {
    localStorage.setItem('username', username);
}

// Установка имени пользователя при загрузке страницы
let currentNickname = loadUsername();
usernameDisplay.innerText = currentNickname;

// Функция для загрузки изображения из localStorage
function loadCircleImage() {
    const savedImage = localStorage.getItem('circleImage');
    if (savedImage) {
        circle.style.backgroundImage = `url(${savedImage})`;
        circle.style.backgroundSize = 'cover';
    } else {
        circle.style.backgroundImage = 'url("../sprites/app.png")'; // Устанавливаем начальное изображение
        circle.style.backgroundSize = 'cover';
    }
}

// Функция для сохранения изображения круга в localStorage
function saveCircleImage(imageData) {
    localStorage.setItem('circleImage', imageData);
}

// Загрузка изображения пользователя
function loadImage() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = event => {
        const file = event.target.files[0];
        const reader = new FileReader();
        
        reader.onload = e => {
            const imageData = e.target.result;
            circle.style.backgroundImage = `url(${imageData})`;
            circle.style.backgroundSize = 'cover';
            saveCircleImage(imageData); // Сохраняем изображение в localStorage
        };
        
        if (file) {
            reader.readAsDataURL(file);
        }
    };
    
    input.click(); // Открываем файловый менеджер
}

// Обработчик события на круг (загрузка изображения)
circle.addEventListener('click', loadImage);

// Обработчик события на кнопку смены имени
changeNameButton.addEventListener('click', () => {
    nameInput.style.display = 'block'; // Показываем поле для ввода имени
    nameInput.focus(); // Устанавливаем фокус на поле
});

// Обработчик события на поле ввода имени
nameInput.addEventListener('keypress', event => {
    if (event.key === 'Enter') {
        currentNickname = nameInput.value || currentNickname; // Обновляем ник, если поле не пустое
        usernameDisplay.innerText = currentNickname; // Обновляем отображаемое имя
        saveUsername(currentNickname); // Сохраняем новое имя
        nameInput.value = ''; // Очищаем поле ввода
        nameInput.style.display = 'none'; // Скрываем поле
    }
});

// Обработчик события на кнопку подписки
subscribeButton.addEventListener('click', () => {
    modal.style.display = 'flex'; // Показываем модальное окно
});

// Обработчик события на закрытие модального окна
closeModalButton.addEventListener('click', () => {
    modal.style.display = 'none'; // Скрываем модальное окно
});

// Закрываем модальное окно при клике вне его
window.onclick = event => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

// Загрузка данных при открытии страницы
document.addEventListener('DOMContentLoaded', () => {
    currentNickname = loadUsername(); // Загрузим сохраненное или случайное имя
    usernameDisplay.innerText = currentNickname; // Отображаем имя
    loadCircleImage(); // Загрузка иконки
    displaySubscriptionStatus(); // Проверяем и отображаем статус подписки
});

let coins = 0;
const coinCounter = document.getElementById("coinCounter");

// Проверка сохранённых монет при загрузке страницы
window.onload = function() {
    const savedCoins = localStorage.getItem("coins");
    if (savedCoins) {
        coins = parseInt(savedCoins);
        coinCounter.textContent = coins; // Обновление отображения монет
    }

    checkSubscriptionValidity(); // Проверяем, не истекла ли подписка
};

// Функция для обновления монет (например, после применения промокода)
function updateCoinCounter(amount) {
    coins += amount;
    coinCounter.textContent = coins; // Обновление отображения монет
    localStorage.setItem("coins", coins); // Сохранение монет
}

const activateButton = document.getElementById('activateButton');
const activationCodeInput = document.getElementById('activationCode');

// Массив с кодами активации
const activationCodes = [
    "LW:w-^[B&w-ay93%-!lk@0-@%R=l",
    "a`Mqk-QQ9[=-88o5X-gzFn#-x/?@",
    "|3\"Ps-aYZcz-XV)*[-1@eKN-@8&cf",
    "`5P_{-#`j>8-cfG}V-orn,a-O=5qa",
    "2f0iJ-=fW$V-P{t2&-:Dl_+-),&0\\",
    "u:*9p-C&<Y3-p9h7o-{=_h{-!NPav",
    "!1:?N-u!^_,-/;E*w-~\\&C2-t2SB/",
    "f3kOx-!WXR9-/+oyL-;[DeN-9-=Zr",
    "91TPo-/#6F#-(f{NM-,Tba,-1&16M",
    "CsPDl-s3!-)-u>8>{-2niCO-%;@Sc",
    "ECR1NK92GNW7RLKNTIKZ1OA",
    "ECRVVAQT9B0JHKQGDU7LM7T",
    "ECRL9M9YN3I17NA4ZPIHG3Z",
    "ECREEJUOANGS554HSBOTDXM",
    "ECRNRLAECM0B29NTKZIH4JA",
    "ECR16UK8UORQH4OCCWWO9XO",
    "ECR2RQKR2AFVJ5IP8LOMDEY",
    "ECRICI3C42NG7LL76N6H1EV",
    "ECRZ2ORAJC7FLOZPYLROPA0",
    "ECR8MD2YH39T1SX11JID9NZ",
    "ECREEUTVF2G5Q2D3V75C98M",
    "ECR1Q0YPWP64VQLNWG50YYO",
    "ECRETGSKTLBARKWUYK2KD6A",
    "ECRHDPPID9Y8C61PTBKGD0I",
    "ECRAPUOTVPVQ9PWCTW0S2TP",
    "ECRH1MIJH0MEF6RCX68WX70",
    "ECR60YDUJ68YRQZODP3I534",
    "ECR5IMQ769J2UXWYSLJNEFU",
    "ECRH8TNI7PU9HODD84YQJ6J",
    "XHTR-PLKS-WQER-YU6P",
    "NMDT-XSZA-UIOL-VCX3",
    "WERT-FDKS-BNVC-RT8Y",
    "QAZW-SXED-CVFR-GT5M",
    "PLMN-OKIJ-UYTG-HBV4",
    "XZLO-ERHG-JHGF-QWE9",
    "LKJH-MNVB-ERDF-UI5T",
    "TRFD-WQAS-PLMN-XCV6",
    "GHJI-QWER-ZXCV-BNM3",
    "LOIK-TRFD-WASE-DX9T",
    "ZQWE-ASDF-XCVB-NM4J",
    "PLMN-UIOP-GHJK-RRT8",
    "ZXCV-ERTF-YUIO-JKL6",
    "NMKL-POIU-YTRE-WRT9",
    "ASDC-XQWE-FRGH-BHJ7",
    "OPIK-LMNB-FRTG-HJK5",
    "WEQR-TYUI-JKLO-NB4F",
    "ZXCF-TRGB-VFRE-QW6E",
    "PLMN-XZCD-SWER-FRG9",
    "MKLO-UIYT-REDF-HB3F",
    "LKJI-PLMN-HGFD-QWE4",
    "ASZX-FERT-QWER-YUI7",
    "NMKO-WERF-DFGR-PLK9",
    "ZXCV-ASDF-QWER-HN4F",
    "TYUI-PLMN-GHJK-DF5T",
    "RFGH-ERTY-YUIO-BNV6",
    "ZXDC-QWER-TYUI-NOP7",
    "LKJI-ASZX-MNVB-WRT8",
    "PLMN-XCVF-DSWE-HN6M",
    "QAZX-DFRE-VCFR-GT4Y",
    "OKIJ-UYTRE-WQAS-LMN5",
    "VFGH-BNJM-QERT-YUH7",
    "ZXWE-ERTY-ASDF-CVB9",
    "MNBV-UIOP-PLKH-JYT4",
    "LOIK-PLMN-HGFR-TYU6",
    "ZXCV-NBTR-WERT-DSA9",
    "TRFE-QAWS-PLMN-XRF8",
    "OKJI-UIRE-TGFD-WAS4",
    "BNJU-WERT-ASCV-KJH9",
    "ZXWE-HGFR-NMKO-QWE8",
    "LKJI-XCVG-TYUI-POL3",
    "WERF-ASZX-NBLO-TRF5",
    "PLMN-MNBV-QWER-XSA8",
    "VFGH-UIOP-KLOJ-BN3D",
    "RTFE-WQED-ASZX-VGT4",
    "NMKL-POLM-HGFR-RTY7",
    "ZXWD-UIOP-MNBV-ERF9",
    "MNBV-TRFG-YUIO-QWE2",
    "OKJI-NBFR-GTDF-XSA7",
    "LKJI-PLMN-QWERT-YU8F",
    "TRFE-MNBV-XCVB-HJ9M",
    "PLMN-QWAS-EDFR-HJU6",
    "ZXSQ-PLMN-HGFR-WRT4",
    "OKJI-VFGR-YUIO-LMN8",
    "ZXCF-EDRT-HGFD-QWS9",
    "POIU-NBVC-XZAS-WERT",
    "LKJI-QWSD-ERFG-TYU5",
    "ZXCF-VFGR-HYUJ-POI9",
    "TRFD-WQSD-ASZX-YUI6",
    "LKJI-PLMN-MNBV-DFR4",
    "ZXAS-PLMN-HYUI-WER5",
    "MNBV-QWRT-ASZX-CVF8",
    "GHJK-LOIU-PLMN-BV4D",
    "OKJI-ASZX-WERT-GVF6",
    "MNBV-PLMN-HYUI-WER3",
    "LKJI-QWER-XCVB-ASD8",
    "ZXCV-ERTG-BVNM-PLM4",
    "LKJI-PLMN-QWAS-VFR6",
    "ZXWE-HGFR-PLMN-DSA9",
    "TRFD-NBVC-XZAS-LOI7",
    "OKJI-QWER-DFRG-BNV4",
    "ASZX-WERT-UIOP-LMN8",
    "PLMN-HYUI-TRFE-CVB9",
    "OKJI-QWSD-VFGR-XCV5",
    "LKJI-MNBV-PLMN-DSA7",
    "ZXAS-QWSD-ERTF-PLM9",
    "LKJI-VFGR-QWSD-BNM3",
    "ZXAS-WERT-HGFR-UIO8",
    "MNBV-XZAS-PLMN-WRT5",
    "LKJI-QWER-TRFD-YUI4",
    "ZXCV-ASZX-NMKO-WRE6",
    "MNBV-PLMN-UIOP-RTF9",
    "LKJI-XZAS-QWER-BNV8",
    "TRFE-VFGR-QWER-NB3F",
    "ZXCV-PLMN-QWSD-BNM6",
    "OKJI-VFGR-ASZX-WE8F",
    "ZXAS-HGFR-PLMN-QWE5",
    "MNBV-TRFE-QWER-XCV4",
    "LKJI-ASZX-WERT-UIO6",
    "MNBV-QWER-TRFD-XCV3",
    "LKJI-QWAS-PLMN-DFG7",
    "ZXCV-HYUI-LOKI-QWE4",
    "MNBV-PLMN-QWER-VF9T",
    "LKJI-QWAS-TRFE-BNM6",
    "ZXAS-WERT-HGFR-PLM3",
    "LKJI-QWER-PLMN-DFG8",
    "ZXAS-HYUI-QWER-VFR9",
    "MNBV-XZAS-TRFE-WE7F",
    "LKJI-QWER-HYUI-VFR4",
    "ZXAS-QWSD-MNBV-PLT5"
];

// Функция для проверки валидности подписки
function checkSubscriptionValidity() {
    const subscriptionDate = localStorage.getItem('subscriptionDate');
    if (subscriptionDate) {
        const currentDate = new Date();
        const savedDate = new Date(subscriptionDate);
        const timeDiff = currentDate - savedDate;
        const daysDiff = timeDiff / (1000 * 60 * 60 * 24);

        // Если прошло более 30 дней с момента активации подписки, она истекает
        if (daysDiff > 30) {
            localStorage.removeItem('isSubscribed');
            localStorage.removeItem('subscriptionDate');
            activationMessage.textContent = "Подписка истекла."; // Отображаем сообщение об истечении подписки
        }
    }
}

// Функция для сохранения подписки и даты активации
function saveSubscription() {
    localStorage.setItem('isSubscribed', 'true');
    localStorage.setItem('subscriptionDate', new Date().toISOString()); // Сохраняем дату активации
}

// Функция для отображения статуса подписки
function displaySubscriptionStatus() {
    if (localStorage.getItem('isSubscribed')) {
        activationMessage.textContent = "Подписка активирована."; // Отображаем сообщение, если подписка активна
    } else {
        activationMessage.textContent = "Подписка не активирована."; // Сообщение, если подписка не активна
    }
}

// Обработчик события на кнопку активации
activateButton.addEventListener('click', () => {
    const inputCode = activationCodeInput.value.trim(); // Получаем код из поля ввода

    if (localStorage.getItem('isSubscribed')) {
        activationMessage.textContent = "Подписка уже активирована!"; // Сообщение, если подписка уже активирована
    } else if (activationCodes.includes(inputCode)) {
        saveSubscription(); // Сохраняем подписку
        activationMessage.textContent = "Подписка активирована!"; // Сообщение об успешной активации
        activationCodeInput.value = ''; // Очищаем поле ввода
        modal.style.display = 'none'; // Закрываем модальное окно
    } else {
        activationMessage.textContent = "Неверный код активации!"; // Сообщение об ошибке
    }
});
