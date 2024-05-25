<?php
session_start();
include 'panier.php';

// Gérer les actions du formulaire
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['action'])) {
    $product_title = $_POST['product_title'];

    if ($_POST['action'] == 'increment') {
        incrementCartQuantity($product_title);
    } elseif ($_POST['action'] == 'decrement') {
        decrementCartQuantity($product_title);
    } elseif ($_POST['action'] == 'clear_cart') {
        clearCart();
    }
}

$cart = getCart();

function renderCart($cart)
{
    ob_start();
    ?>
    <ul>
        <?php foreach ($cart as $productId => $quantity): ?>
            <li>
                <?php echo $productId; ?>:
                <form style="display:inline;">
                    <input type="hidden" name="product_title" value="<?php echo $productId; ?>">
                    <button type="button" class="btn-quantite"
                        onclick="updateCart('decrement', '<?php echo $productId; ?>')">-</button>
                    <?php echo $quantity; ?>
                    <button type="button" class="btn-quantite"
                        onclick="updateCart('increment', '<?php echo $productId; ?>')">+</button>
                </form>
            </li>
        <?php endforeach; ?>
    </ul>


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