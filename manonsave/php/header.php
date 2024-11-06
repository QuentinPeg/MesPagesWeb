<?php
session_start();
include 'panier.php';

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['product_id']) && isset($_POST['quantity']) && isset($_POST['format']) && isset($_POST['plastifie'])) {
    $product_id = $_POST['product_id'];
    $quantity = $_POST['quantity'];
    $format = $_POST['format'];
    $plastifie = $_POST['plastifie'];

    if (!empty($product_id) && is_numeric($quantity) && $quantity > 0) {
        try {
            addToCart($product_id, $quantity, $format, $plastifie);
            echo json_encode(['success' => true]);
        } catch (Exception $e) {
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid data']);
    }
    exit;
}
?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">
</head>

<body>
    <header>
        <a href="../php/index.php"><img class="ipage" src="../Images/Logolescahiersduneinfirmiere.jpg" alt="Icon-page"></a>
        <div id="vide"></div>
        <h1>Les cahiers d'une infirmière</h1>
        <div id="entete">
            <a href="Contact.php">CONTACT</a>
        </div>
        <a onclick="showCart()">
            <span class="panier-link">
                <img src="../Images/panier.svg" alt="panier">
                <span class="nombre-articles-panier" id="panier-bulle">0</span>
                <span class="nombre-articles-header" id="nombre-articles-header"></span>
            </span>
        </a>
    </header>

