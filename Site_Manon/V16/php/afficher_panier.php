<?php
session_start();
include 'panier.php';

try {
    if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['action'])) {
        $product_title = $_POST['product_title'];
        $format = $_POST['format'] ?? null;
        $plastifie = $_POST['plastifie'] ?? null;

        if ($_POST['action'] == 'increment') {
            incrementCartQuantity($product_title, $format, $plastifie);
        } elseif ($_POST['action'] == 'decrement') {
            decrementCartQuantity($product_title, $format, $plastifie);
        } elseif ($_POST['action'] == 'clear_cart') {
            clearCart();
        } elseif ($_POST['action'] == 'update_format') {
            updateCartFormat($product_title, $format);
        } elseif ($_POST['action'] == 'update_plastifie') {
            updateCartPlastifie($product_title, $plastifie);
        }
    }

    $cart = getCart();

    function renderCart($cart)
    {
        ob_start();
        ?>
        <ul id="panier-liste">
            <?php foreach ($cart as $productId => $details): ?>
                <li>
                    <?php echo $details['id'] . "<br>(Format : " . $details['format'] . " - Plastifié : " . $details['plastifie'] . ") : "; ?>
                    <form style="display:inline;">
                        <input type="hidden" name="product_title" value="<?php echo $details['id']; ?>">
                        <input type="hidden" name="format" value="<?php echo $details['format']; ?>">
                        <input type="hidden" name="plastifie" value="<?php echo $details['plastifie']; ?>">
                        <br>
                        <button type="button" class="btn-quantite"
                            onclick="updateCart('decrement', '<?php echo $details['id']; ?>', '<?php echo $details['format']; ?>', '<?php echo $details['plastifie']; ?>')">-</button>
                        <?php echo $details['quantity']; ?>
                        <button type="button" class="btn-quantite"
                            onclick="updateCart('increment', '<?php echo $details['id']; ?>', '<?php echo $details['format']; ?>', '<?php echo $details['plastifie']; ?>')">+</button>
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
    <?php }
} catch (Exception $e) {
    echo 'Erreur : ' . $e->getMessage();
    error_log($e->getMessage());
}

function updateCartFormat($product_title, $new_format)
{
    foreach ($_SESSION['cart'] as $key => $item) {
        if ($item['id'] == $product_title) {
            // Construire la nouvelle clé avec le nouveau format
            $new_key = $product_title . '-' . $new_format . '-' . $item['plastifie'];
            // Mettre à jour l'article avec le nouveau format
            $item['format'] = $new_format;
            // Supprimer l'ancienne entrée
            unset($_SESSION['cart'][$key]);
            // Ajouter l'article mis à jour avec la nouvelle clé
            $_SESSION['cart'][$new_key] = $item;
            break; // Sortir de la boucle une fois l'article trouvé et mis à jour
        }
    }
    
}

function updateCartPlastifie($product_title, $new_plastifie)
{
    foreach ($_SESSION['cart'] as $key => $item) {
        if ($item['id'] == $product_title) {
            // Construire la nouvelle clé avec le nouveau plastifié
            $new_key = $product_title . '-' . $item['format'] . '-' . $new_plastifie;
            // Mettre à jour l'article avec le nouveau plastifié
            $item['plastifie'] = $new_plastifie;
            // Supprimer l'ancienne entrée
            unset($_SESSION['cart'][$key]);
            // Ajouter l'article mis à jour avec la nouvelle clé
            $_SESSION['cart'][$new_key] = $item;
            break; // Sortir de la boucle une fois l'article trouvé et mis à jour
        }
    }
}