<?php
session_start();

function mettreAJourNombreArticlesPanier()
{
    $nombreArticles = 0;
    if (isset($_SESSION['cart'])) {
        foreach ($_SESSION['cart'] as $id => $details) {
            $nombreArticles += $details['quantity'];
        }
    }
    $_SESSION['nombreArticles'] = $nombreArticles;
}

function addToCart($id, $quantity, $format, $plastifie)
{
    if (!isset($_SESSION['cart'])) {
        $_SESSION['cart'] = array();
    }
    
    $itemKey = $id . '-' . $format . '-' . $plastifie;

    if (isset($_SESSION['cart'][$itemKey])) {
        $_SESSION['cart'][$itemKey]['quantity'] += $quantity;
    } else {
        $_SESSION['cart'][$itemKey] = array(
            'id' => $id,
            'quantity' => $quantity,
            'format' => $format,
            'plastifie' => $plastifie
        );
    }
    mettreAJourNombreArticlesPanier();
}

function removeFromCart($id, $format, $plastifie)
{
    $itemKey = $id . '-' . $format . '-' . $plastifie;

    if (isset($_SESSION['cart'][$itemKey])) {
        unset($_SESSION['cart'][$itemKey]);
    }
    mettreAJourNombreArticlesPanier();
}

function clearCart()
{
    $_SESSION['cart'] = array();
    mettreAJourNombreArticlesPanier();
}

function getCart()
{
    return isset($_SESSION['cart']) ? $_SESSION['cart'] : array();
}

function incrementCartQuantity($id, $format, $plastifie)
{
    $itemKey = $id . '-' . $format . '-' . $plastifie;

    if (isset($_SESSION['cart'][$itemKey])) {
        $_SESSION['cart'][$itemKey]['quantity']++;
    }
    mettreAJourNombreArticlesPanier();
}

function decrementCartQuantity($id, $format, $plastifie)
{
    $itemKey = $id . '-' . $format . '-' . $plastifie;

    if (isset($_SESSION['cart'][$itemKey])) {
        if ($_SESSION['cart'][$itemKey]['quantity'] > 1) {
            $_SESSION['cart'][$itemKey]['quantity']--;
        } else {
            removeFromCart($id, $format, $plastifie);
        }
    }
    mettreAJourNombreArticlesPanier();
}
?>
