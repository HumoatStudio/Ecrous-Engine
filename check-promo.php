<?php
header('Content-Type: application/json');

// Список промокодов и их бонусы
$promoCodes = array(
    "FREE100" => 100,
    "BONUS50" => 50,
    "COIN20" => 20
);

// Получение данных из запроса
$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input['promoCode'])) {
    echo json_encode(array("success" => false, "message" => "Промокод не указан."));
    exit;
}

$promoCode = strtoupper($input['promoCode']); // Приводим промокод к верхнему регистру

if (array_key_exists($promoCode, $promoCodes)) {
    echo json_encode(array("success" => true, "bonus" => $promoCodes[$promoCode]));
} else {
    echo json_encode(array("success" => false, "message" => "Неверный или недействительный промокод."));
}
?>
