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

<script>
    // Gestion des cookies
    function getCookie(name) {
        let match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        return match ? match[2] : null;
    }

    function deleteCookie() {
        document.cookie = 'preferences=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure; SameSite=Strict';
        showCookieBanner(); // Réaffiche la bannière
    }

    function showCookieBanner() {
        // Affiche la bannière de consentement
        document.getElementById('cookie-consent-popup').style.display = 'block';
        document.body.classList.add('body-no-scroll');

        // Remonte en haut de la page
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Défilement fluide
        });
    }


    function hideCookieBanner() {
        document.getElementById('cookie-consent-popup').style.display = 'none';
        document.body.classList.remove('body-no-scroll');
    }

    window.onload = function () {
        let preferences = getCookie('preferences');
        if (!preferences) {
            showCookieBanner();
        } else {
            hideCookieBanner();
        }
    };
</script>