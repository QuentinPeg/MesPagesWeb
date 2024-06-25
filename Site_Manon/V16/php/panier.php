<?php
session_start();


function mettreAJourNombreArticlesPanier()
{
    $nombreArticles = 0;
    if (isset($_SESSION['cart'])) {
        foreach ($_SESSION['cart'] as $id => $quantity) {
            $nombreArticles += $quantity;
        }
    }
    $_SESSION['nombreArticles'] = $nombreArticles;
}

function addToCart($id, $quantity)
{
    if (!isset($_SESSION['cart'])) {
        $_SESSION['cart'] = array();
    }
    if (isset($_SESSION['cart'][$id])) {
        $_SESSION['cart'][$id] += $quantity;
    } else {
        $_SESSION['cart'][$id] = $quantity;
    }
    mettreAJourNombreArticlesPanier();
}

function removeFromCart($id)
{
    if (isset($_SESSION['cart'][$id])) {
        unset($_SESSION['cart'][$id]);
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

function incrementCartQuantity($id)
{
    if (isset($_SESSION['cart'][$id])) {
        $_SESSION['cart'][$id]++;
    }
    mettreAJourNombreArticlesPanier();

}

function decrementCartQuantity($id)
{
    if (isset($_SESSION['cart'][$id]) && $_SESSION['cart'][$id] > 1) {
        $_SESSION['cart'][$id]--;
    } else {
        removeFromCart($id);
    }
    mettreAJourNombreArticlesPanier();
}

