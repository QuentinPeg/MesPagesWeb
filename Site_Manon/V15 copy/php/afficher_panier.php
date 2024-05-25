<?php
session_start();
include 'panier.php';

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

function renderCart($cart) {
    ob_start();
    ?>
    <h1>Votre panier</h1>
    <ul>
        <?php foreach ($cart as $productId => $quantity): ?>
            <li>
                Produit <?php echo $productId; ?>:
                <form style="display:inline;">
                    <input type="hidden" name="product_id" value="<?php echo $productId; ?>">
                    <button type="button" onclick="updateCart('decrement', '<?php echo $productId; ?>')">-</button>
                    <?php echo $quantity; ?>
                    <button type="button" onclick="updateCart('increment', '<?php echo $productId; ?>')">+</button>
                </form>
            </li>
        <?php endforeach; ?>
    </ul>
    <button type="button" onclick="clearCart()">Vider le panier</button>
    <p><a href="index.php">Retour à la page d'accueil</a></p>
    <p><a href="contact.php">Continuer ma commande</a></p>
    <?php
    return ob_get_clean();
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    echo renderCart($cart);
} else {
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Afficher le panier</title>
</head>
<body>
    <?php echo renderCart($cart); ?>
</body>
</html>
<?php } ?>
