<?php include 'header.php'; ?>

<title>NOM SITE</title>
<script src="../js/ajoutarticle.js"></script>

<main>
    <p>Petite Description</p>

    <h2 class="titre_partie">Les articles aparaitrons ici</h2>
    <!-- Section pour les articles -->
    <section id="ajouter_articles_ici"></section>

    <!-- Fenêtre modale -->
    <div id="article-modal" class="modal">
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <img id="modal-image" src="" alt="Image de l'article" class="modal-image">
            <h2 id="modal-title"></h2>
            <p id="modal-description"></p>
            <p id="modal-price"></p>
            <button id="add-to-cart-modal">Ajouter au panier</button>
        </div>
    </div>

    <?php include 'consentement.php'; ?>
</main>
<?php include 'footer.php'; ?>


<!-- Icône de paramétrage des cookies -->
<div id="cookie-settings-icon" onclick="showCookieBanner()">
    <img src="../Images/cookie.png" alt="Cookie Settings" />
</div>
<script src="https://unpkg.com/@supabase/supabase-js" defer></script>
<script src="../js/ajoutarticle.js" defer></script>
<script src="../js/cookie.js"></script>