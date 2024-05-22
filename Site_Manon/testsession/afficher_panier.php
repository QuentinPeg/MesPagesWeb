<?php
session_start();
include 'panier.php';

// Gérer les actions du formulaire
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['action'])) {
    $product_id = $_POST['product_id'];

    if ($_POST['action'] == 'increment') {
        incrementCartQuantity($product_id);
    } elseif ($_POST['action'] == 'decrement') {
        decrementCartQuantity($product_id);
    } elseif ($_POST['action'] == 'clear_cart') {
        clearCart();
    }
}

$cart = getCart();
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Afficher le panier</title>
</head>
<body>
    <h1>Votre panier</h1>
    <ul>
        <?php foreach ($cart as $productId => $quantity): ?>
            <li>
                Produit <?php echo $productId; ?>:
                <form action="afficher_panier.php" method="post" style="display:inline;">
                    <input type="hidden" name="product_id" value="<?php echo $productId; ?>">
                    <button type="submit" name="action" value="decrement">-</button>
                    <?php echo $quantity; ?>
                    <button type="submit" name="action" value="increment">+</button>
                </form>
            </li>
        <?php endforeach; ?>
    </ul>
    
    <!-- Formulaire pour vider le panier -->
    <form action="afficher_panier.php" method="post">
        <input type="hidden" name="action" value="clear_cart">
        <input type="submit" value="Vider le panier">
    </form>
    
    <p><a href="index.php">Retour à la page d'accueil</a></p>
    <p><a href="contact.php">Continuer ma commande</a></p>
</body>
</html>
