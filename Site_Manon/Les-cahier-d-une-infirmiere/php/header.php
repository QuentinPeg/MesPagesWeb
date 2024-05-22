<?php session_start(); ?>
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">
    <script src="https://js.stripe.com/v3/"></script>
</head>

<body>

    <!-- Header -->
    <header>
        <a href="../php/index.php"><img class="ipage" src="../Images/Logolescahiersduneinfirmiere.jpg"
                alt="Icon-page"></a>
        <div id="vide"></div>
        <h1>Les cahiers d'une infirmière</h1>
        <div id="entete">
            <a href="Contact.php">CONTACT</a>
        </div>
        <span class="panier-link">
            <img src="../Images/panier.svg" alt="panier">
            <span class="nombre-articles-panier" id="panier-bulle">0</span>
        </span>
    </header>

    <!-- Panier -->
    <div id="panier-fenetre" class="panier-fenetre">
        <h3>Panier</h3>
        <ul id="panier-liste">
            <!-- Liste des articles ajoutés au panier -->
        </ul>
        <button onclick="afficherPrecommande()">Commander</button>
        <button onclick="supprimerToutPanier()">Supprimer le panier</button>
        <p id="prixTotal">0 €</p>
    </div>

    <!-- Fenêtre de précommande -->
    <div id="precommande-fenetre" class="panier-fenetre" style="display: none;">
        <h3>Précommande</h3>
        <div id="recap-articles">
            <!-- Récapitulatif des articles ajoutés au panier -->
        </div>
        <button onclick="masquerPrecommande()">Modifier</button>
        <button onclick="validerPrecommande()">Valider</button>
    </div>
