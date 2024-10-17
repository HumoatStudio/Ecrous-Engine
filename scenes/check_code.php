<?php
// Установка заголовков для JSON-ответа и CORS (если нужно)
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Получение данных из POST-запроса
$data = json_decode(file_get_contents('php://input'), true);

// Проверяем, передан ли код
if (!isset($data['code'])) {
    echo json_encode(['success' => false, 'message' => 'Код не передан']);
    exit;
}

$inputCode = $data['code'];

// Массив с кодами активации (можно загружать из базы данных для безопасности)
$activationCodes = [
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
    "ECR8MD2YH39T1SX11JID9NZ"
    // ... другие коды
];

// Проверяем, есть ли введенный код в массиве
if (in_array($inputCode, $activationCodes)) {
    echo json_encode(['success' => true, 'message' => 'Код активации успешен']);
} else {
    echo json_encode(['success' => false, 'message' => 'Неверный код активации']);
}
?>