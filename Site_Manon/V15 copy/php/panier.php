<?php
session_start();

// Fonction pour ajouter un article au panier
function addToCart($id, $quantity) {
    if (!isset($_SESSION['cart'])) {
        $_SESSION['cart'] = array();
    }
    if (isset($_SESSION['cart'][$id])) {
        $_SESSION['cart'][$id] += $quantity;
    } else {
        $_SESSION['cart'][$id] = $quantity;
    }
}

// Fonction pour supprimer un article du panier
function removeFromCart($id) {
    if (isset($_SESSION['cart'][$id])) {
        unset($_SESSION['cart'][$id]);
    }
}

// Fonction pour vider le panier
function clearCart() {
    $_SESSION['cart'] = array();
}

// Fonction pour obtenir le contenu du panier
function getCart() {
    return isset($_SESSION['cart']) ? $_SESSION['cart'] : array();
}

// Fonction pour mettre à jour la quantité d'un produit dans le panier
function updateCart($id, $quantity) {
    if (isset($_SESSION['cart'][$id])) {
        if ($quantity > 0) {
            $_SESSION['cart'][$id] = $quantity;
        } else {
            removeFromCart($id);
        }
    }
}
?>
