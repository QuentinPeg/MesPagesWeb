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
    <style>
        .modal {
            display: none;
            position: fixed;
            z-index: 1;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgb(0,0,0);
            background-color: rgba(0,0,0,0.4);
        }
        .modal-content {
            background-color: #fefefe;
            margin: 15% auto;
            padding: 20px;
            border: 1px solid #888;
            width: 80%;
        }
        .close {
            color: #aaa;
            float: right;
            font-size: 28px;
            font-weight: bold;
        }
        .close:hover,
        .close:focus {
            color: black;
            text-decoration: none;
            cursor: pointer;
        }
    </style>
    <script>
        function incrementQuantity() {
            document.getElementById('quantity').stepUp();
        }

        function decrementQuantity() {
            document.getElementById('quantity').stepDown();
        }

        function openModal() {
            document.getElementById('myModal').style.display = "block";
            fetch('afficher_panier.php')
                .then(response => response.text())
                .then(data => document.getElementById('modal-content').innerHTML = data);
        }

        function closeModal() {
            document.getElementById('myModal').style.display = "none";
        }

        function updateCart(action, productId) {
            const formData = new FormData();
            formData.append('action', action);
            formData.append('product_id', productId);
            fetch('afficher_panier.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(data => document.getElementById('modal-content').innerHTML = data);
        }

        function clearCart() {
            const formData = new FormData();
            formData.append('action', 'clear_cart');
            fetch('afficher_panier.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(data => document.getElementById('modal-content').innerHTML = data);
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
    <p><button type="button" onclick="openModal()">Voir le panier</button></p>

    <div id="myModal" class="modal">
        <div class="modal-content" id="modal-content">
            <span class="close" onclick="closeModal()">&times;</span>
        </div>
    </div>
</body>
</html>
