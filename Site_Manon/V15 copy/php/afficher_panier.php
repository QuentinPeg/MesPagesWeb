<?php
session_start();
include 'panier.php';

// Vérifier si une action de modification de la quantité a été soumise via AJAX
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['product_id']) && isset($_POST['action'])) {
    $product_id = $_POST['product_id'];
    $action = $_POST['action'];
    $quantity = isset($_POST['quantity']) ? intval($_POST['quantity']) : 0;
    if ($action == 'reduce') {
        updateCart($product_id, $quantity - 1);
    } elseif ($action == 'increase') {
        updateCart($product_id, $quantity + 1);
    }
    if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH'] === 'XMLHttpRequest') {
        echo json_encode(['success' => true, 'cart' => getCart()]);
        exit();
    }
}

// Vérifier si le formulaire pour vider le panier a été soumis via AJAX
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['action']) && $_POST['action'] == 'clear_cart') {
    clearCart();
    if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH'] === 'XMLHttpRequest') {
        echo json_encode(['success' => true, 'cart' => getCart()]);
        exit();
    } else {
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
    <ul id="cart-items">
        <?php foreach (getCart() as $productId => $quantity): ?>
            <li>
                Produit <?php echo $productId; ?>:
                <form class="update-cart-form" action="afficher_panier.php" method="post" style="display:inline;">
                    <input type="hidden" name="product_id" value="<?php echo $productId; ?>">
                    <input type="hidden" name="quantity" value="<?php echo $quantity; ?>">
                    <button type="button" class="btn-update-cart" data-action="reduce">-</button>
                </form>
                <?php echo $quantity; ?>
                <form class="update-cart-form" action="afficher_panier.php" method="post" style="display:inline;">
                    <input type="hidden" name="product_id" value="<?php echo $productId; ?>">
                    <input type="hidden" name="quantity" value="<?php echo $quantity; ?>">
                    <button type="button" class="btn-update-cart" data-action="increase">+</button>
                </form>
            </li>
        <?php endforeach; ?>
    </ul>
    <div class="boutons-panier">
        <!-- Formulaire pour vider le panier -->
        <form class="clear-cart-form" action="afficher_panier.php" method="post">
            <input type="hidden" name="action" value="clear_cart">
            <input type="hidden" name="return_url" value="<?php echo htmlspecialchars($_SERVER['HTTP_REFERER']); ?>">
            <input class="btn-supprimer-tout" type="submit" value="Vider le panier">
        </form>
        <button class="btn-precommander" onclick="afficherPrecommande()">Précommander</button>
    </div>

    <script>
        document.addEventListener("DOMContentLoaded", function() {
            document.querySelectorAll(".btn-update-cart").forEach(function(button) {
                button.addEventListener("click", function() {
                    var form = this.closest("form");
                    var action = this.getAttribute("data-action");
                    var formData = new FormData(form);
                    formData.append("action", action);

                    var xhr = new XMLHttpRequest();
                    xhr.open("POST", "afficher_panier.php", true);
                    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                    xhr.onreadystatechange = function() {
                        if (xhr.readyState === XMLHttpRequest.DONE) {
                            if (xhr.status === 200) {
                                var response = JSON.parse(xhr.responseText);
                                if (response.success) {
                                    updateCartDisplay(response.cart);
                                }
                            } else {
                                console.error("Erreur de mise à jour du panier");
                            }
                        }
                    };
                    xhr.send(formData);
                });
            });

            document.querySelector(".clear-cart-form").addEventListener("submit", function(e) {
                e.preventDefault();
                var formData = new FormData(this);
                var xhr = new XMLHttpRequest();
                xhr.open("POST", "afficher_panier.php", true);
                xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        if (xhr.status === 200) {
                            var response = JSON.parse(xhr.responseText);
                            if (response.success) {
                                updateCartDisplay(response.cart);
                            }
                        } else {
                            console.error("Erreur de mise à jour du panier");
                        }
                    }
                };
                xhr.send(formData);
            });
        });

        function updateCartDisplay(cart) {
            var cartItems = document.getElementById('cart-items');
            cartItems.innerHTML = '';
            for (var productId in cart) {
                if (cart.hasOwnProperty(productId)) {
                    var quantity = cart[productId];
                    var li = document.createElement('li');
                    li.innerHTML = 'Produit ' + productId + ': ' +
                        '<form class="update-cart-form" action="afficher_panier.php" method="post" style="display:inline;">' +
                        '<input type="hidden" name="product_id" value="' + productId + '">' +
                        '<input type="hidden" name="quantity" value="' + quantity + '">' +
                        '<button type="button" class="btn-update-cart" data-action="reduce">-</button>' +
                        '</form> ' + quantity + ' ' +
                        '<form class="update-cart-form" action="afficher_panier.php" method="post" style="display:inline;">' +
                        '<input type="hidden" name="product_id" value="' + productId + '">' +
                        '<input type="hidden" name="quantity" value="' + quantity + '">' +
                        '<button type="button" class="btn-update-cart" data-action="increase">+</button>' +
                        '</form>';
                    cartItems.appendChild(li);
                }
            }

            // Ré-attacher les gestionnaires d'événements
            document.querySelectorAll(".btn-update-cart").forEach(function(button) {
                button.addEventListener("click", function() {
                    var form = this.closest("form");
                    var action = this.getAttribute("data-action");
                    var formData = new FormData(form);
                    formData.append("action", action);

                    var xhr = new XMLHttpRequest();
                    xhr.open("POST", "afficher_panier.php", true);
                    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                    xhr.onreadystatechange = function() {
                        if (xhr.readyState === XMLHttpRequest.DONE) {
                            if (xhr.status === 200) {
                                var response = JSON.parse(xhr.responseText);
                                if (response.success) {
                                    updateCartDisplay(response.cart);
                                }
                            } else {
                                console.error("Erreur de mise à jour du panier");
                            }
                        }
                    };
                    xhr.send(formData);
                });
            });
        }
    </script>
</body>
</html>
