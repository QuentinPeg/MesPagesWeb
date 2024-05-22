<?php
session_start();
include 'panier.php';

// Vérifier si une action de modification de la quantité a été soumise
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['product_id']) && isset($_POST['action'])) {
    $product_id = $_POST['product_id'];
    $action = $_POST['action'];
    if ($action == 'reduce') {
        updateCart($product_id, $_POST['quantity'] - 1);
    } elseif ($action == 'increase') {
        updateCart($product_id, $_POST['quantity'] + 1);
    }
}

// Vérifier si le formulaire pour vider le panier a été soumis
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['action']) && $_POST['action'] == 'clear_cart') {
    clearCart();
    // Redirection vers l'URL de retour
    if (isset($_POST['return_url'])) {
        header("Location: " . $_POST['return_url']);
        exit();
    }
}
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
        <?php foreach (getCart() as $productId => $quantity): ?>
            <li>
                Produit <?php echo $productId; ?>:
                <form action="afficher_panier.php" method="post" style="display:inline;">
                    <input type="hidden" name="product_id" value="<?php echo $productId; ?>">
                    <input type="hidden" name="quantity" value="<?php echo $quantity; ?>">
                    <button type="submit" name="action" value="reduce">-</button>
                </form>
                <?php echo $quantity; ?>
                <form action="afficher_panier.php" method="post" style="display:inline;">
                    <input type="hidden" name="product_id" value="<?php echo $productId; ?>">
                    <input type="hidden" name="quantity" value="<?php echo $quantity; ?>">
                    <button type="submit" name="action" value="increase">+</button>
                </form>
            </li>
        <?php endforeach; ?>
    </ul>
    <div class="boutons-panier">
        <!-- Formulaire pour vider le panier -->
        <form  action="afficher_panier.php" method="post">
            <input type="hidden" name="action" value="clear_cart">
            <input type="hidden" name="return_url" value="<?php echo htmlspecialchars($_SERVER['HTTP_REFERER']); ?>">
            <input class="btn-supprimer-tout" type="submit" value="Vider le panier">
        </form>
        <button class="btn-precommander" onclick="afficherPrecommande()">Précommander</button>
    </div>
</body>
</html>
