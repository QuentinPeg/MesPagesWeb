<?php include 'header.php'; ?>
<link rel="stylesheet" href="../css/paiement.css">
<title>Les cahiers d'une infirmière</title>

<main>
    <h1>Merci de votre commande</h1>
    <p>Votre commande a été accepté, elle sera préparé et envoyé au cours de la semaine, nous vous recontacterons si
        nécéssaire...</p>
    <a href="index.php">
        <img src="../Images/Logolescahiersduneinfirmiere.jpg" alt="Les cahiers d'un infirmière"></a>


    <p>Pour revenir a la page d'accueil cliquer sur le bouton ci dessous</p>
    <section>
        <a href="index.php"><button class="btn-retour">Accueil</button></a>
        <!--<button class="btn-precommander" onclick="afficherPrecommande()">Précommander</button>-->
    </section>
</main>
<footer>
    <p>Une petite note sur moi :
        J'ai été étudiante infirmière, c'est à ce moment-là que ces fiches ont été créées. La base de ces fiches
        s'est construit sur les apports théoriques vus en cours et en stage ainsi les apports que j'ai pu voir et
        apprendre
        en stage.
        Ces fiches m'ont permis d'étudier et de réviser mes partiels pendant mes trois années de formation,
        et m'ont conduite jusqu'à l'obtention de mon diplôme. Une fois diplômée j'ai travaillé en service d'urgence
        puis en hospitalisation à domicile.</p>
    <h2>Merci de votre visite​​ ! A bientôt​​ !</h2>
    <div>
        <a href="../php/conditions&mentions.php">
            <p>Coder par Peguin Quentin</p>
        </a>
        <a href="../php/conditions&mentions.php">
            <p>&copy; Tout droit d'auteur réservé</p>
        </a>
        <a href="../php/conditions&mentions.php">
            <p>Conditions d'utilisation & Mentions légales</p>
        </a>
</footer>


</body>
<script>
document.addEventListener('DOMContentLoaded', envoyerMail());
</script>


<script>
        window.addEventListener("scroll", function () {
        var header = document.querySelector("header");
        var h1 = document.querySelector("h1");
        var a = document.querySelector("#entcontact>a");
        var imgipage = document.querySelector("img");

        if (window.scrollY > 50) {
            header.classList.add("shrink");
        h1.classList.add("shrink");
        a.classList.add("shrink");
        imgipage.classList.add("shrink");

        } else {
            header.classList.remove("shrink");
        h1.classList.remove("shrink");
        a.classList.remove("shrink");
        imgipage.classList.remove("shrink");

        }
    });
</script>


</php>