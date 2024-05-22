<?php include 'header.php'; ?>
<title>Les cahiers d'une infirmière</title>
<script src="../js/ajoutarticle.js"></script>

<!-- Contenu principal -->
<main>
    <p>Tu es étudiant ou diplômé et tu as besoin d'une piqure de rappel, ce site est fait pour toi !</p>
    <!-- Section des articles -->
    <!-- POUR METTRE EN SOLDE (NE PAS SUPPRIMER) <span class="solde-icon">Solde</span> -->
    <h2 class="titre_partie">
        Les packs
    </h2>
    <section id="packs">
    </section>

    <h2 class="titre_partie">
        Les spécifications <!--(titre a trouver)-->
    </h2>
    <section id="nonpacks">
    </section>

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

    <?php include 'footer.php'; ?>
