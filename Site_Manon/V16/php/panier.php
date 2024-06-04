<?php
session_start();

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

function removeFromCart($id) {
    if (isset($_SESSION['cart'][$id])) {
        unset($_SESSION['cart'][$id]);
    }
}

function clearCart() {
    $_SESSION['cart'] = array();
}

function getCart() {
    return isset($_SESSION['cart']) ? $_SESSION['cart'] : array();
}

function incrementCartQuantity($id) {
    if (isset($_SESSION['cart'][$id])) {
        $_SESSION['cart'][$id]++;
    }
}

function decrementCartQuantity($id) {
    if (isset($_SESSION['cart'][$id]) && $_SESSION['cart'][$id] > 1) {
        $_SESSION['cart'][$id]--;
    } else {
        removeFromCart($id);
    }
}
?>
