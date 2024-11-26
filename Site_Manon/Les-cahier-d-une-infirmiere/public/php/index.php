<?php include 'header.php'; ?>

<title>Les cahiers d'une infirmière</title>
<script src="../js/ajoutarticle.js"></script>

<main>
    <p>Tu es étudiant ou diplômé et tu as besoin d'une piqure de rappel, ce site est fait pour toi !</p>

    <h2 class="titre_partie">Les packs</h2>
    <section id="packs"></section>

    <h2 class="titre_partie">Les spécifications</h2>
    <section id="nonpacks"></section>

    <?php include 'consentement.php'; ?>
    <?php include 'footer.php'; ?>
</main>

<!-- Icône de paramétrage des cookies -->
<div id="cookie-settings-icon" onclick="showCookieBanner()">
    <img src="../Images/cookie.png" alt="Cookie Settings" />
</div>

<script src="../js/cookie.js"></script>