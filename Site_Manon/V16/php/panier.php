<?php
session_start();

function getCart()
{
    return isset($_SESSION['cart']) ? $_SESSION['cart'] : array();
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