<?php
session_start();
include 'panier.php';

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['product_title']) && isset($_POST['quantity'])) {
    $product_title = $_POST['product_title'];
    $quantity = $_POST['quantity'];
    addToCart($product_title, $quantity);
    // Répondre avec une confirmation que l'article a été ajouté
    echo json_encode(['success' => true]);
    exit;
}
?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/styles.css">
    <script src="https://cdn.emailjs.com/dist/email.min.js"></script>
    <script src="../js/app.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">
</head>

<body>
    <header>
        <a href="../php/index.php"><img class="ipage" src="../Images/Logolescahiersduneinfirmiere.jpg"
                alt="Icon-page"></a>
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