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
    <title>Page d'accueil</title>
    <script>
        function incrementQuantity() {
            document.getElementById('quantity').stepUp();
        }

        function decrementQuantity() {
            document.getElementById('quantity').stepDown();
        }
    </script>
</head>
<body>
    <h1>Page d'accueil</h1>
    
    <h2>Ajouter un article au panier</h2>
    <form action="index.php" method="post">
        <label for="product_id">ID du produit :</label>
        <input type="text" id="product_id" name="product_id"><br>
        <label for="quantity">Quantité :</label>
        <input type="number" id="quantity" name="quantity" value="1" min="1">
        <button type="button" onclick="decrementQuantity()">-</button>
        <button type="button" onclick="incrementQuantity()">+</button><br>
        <input type="submit" value="Ajouter au panier">
    </form>

    <p><a href="contact.php">Continuer ma commande</a></p>
    <p><a href="afficher_panier.php">Voir le panier</a></p>
</body>
</html>
