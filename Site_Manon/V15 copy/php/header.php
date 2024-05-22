<?php
session_start();
include 'panier.php';
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['product_id']) && isset($_POST['quantity'])) {
    $product_id = $_POST['product_id'];
    $quantity = $_POST['quantity'];
    addToCart($product_id, $quantity);
}
?>

<!DOCTYPE html>
<html lang="fr">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="../js/ajoutarticle.js"></script>
        <link rel="stylesheet" href="../css/styles.css">
        <!-- Ajout des scripts JavaScript -->
        <script src="https://js.stripe.com/v3/"></script>
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
                </span>
            </a>

        </header>