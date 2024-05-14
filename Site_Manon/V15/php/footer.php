<!-- Fenêtre flottante du panier 
<div class="panier-fenetre" id="panier-fenetre" style="display: none;">
    <div class="panier">
        <h2>Votre Panier</h2>
        <ul id="panier-liste"></ul>
        <div class="boutons-panier">
            <button class="btn-supprimer-tout" onclick="supprimerToutPanier()">Supprimer tout le
                panier</button>
            <button class="btn-precommander" onclick="afficherPrecommande()">Précommander</button>
        </div>
    </div>
</div>

 /*Fenêtre flottante de précommande */
<div class="precommande-fenetre" id="precommande-fenetre">
    <div class="precommande-contenu">
        <span class="precommande-fermer" onclick="fermerPrecommande()">&times;</span>
        <h2>Formulaire de Précommande</h2>
        <form id="payment-form" action="charge.php" method="post">

            <h3>Récapitulatif des articles :</h3>
            <div id="recap-articles"></div>

            <section>
                <div class="grp">
                    <label for="Nom">Nom :</label>
                    <input type="text" id="Nom" name="Nom" placeholder="Nom*" required>
                </div>
                <div class="grp">
                    <label for="Prénom">Prénom :</label>
                    <input type="text" id="Prénom" name="Prénom" placeholder="Prénom*" required>
                </div>
            </section>

            <section>
                <div class="grp">

                    <label for="Email">Email :</label>
                    <input type="email" id="Email" name="Email" placeholder="Email*" required>
                </div>
                <div class="grp">
                    <label for="numero">Numéro de téléphone :</label>
                    <input type="tel" id="numero" name="numero" placeholder="Numéro de téléphone*" required>

                </div>
            </section>
            <section>
                <div class="grp">

                    <label for="Adresse">Adresse : </label>
                    <input type="text" id="Adresse" name="Adresse" placeholder="Adresse*" required>
                </div>
                <div class="grp">
                    <label for="CodePostale">Code Postale :</label>
                    <input type="text" id="CodePostale" name="Code_Postale" placeholder="Code Postale*" required>
                </div>
            </section>
            <section>
                <div class="grp">
                    <label for="Ville">Ville :</label>
                    <input type="text" id="Ville" name="Ville" placeholder="Ville*" required>
                </div>
            </section>


            <hr>


            <input type="hidden" id="amount" name="amount" value="0">

            <div id="card-element">

            </div>
            <div id="card-errors" role="alert">

            </div>




            <section id="section-bouton">
                <button type="button" class="btn-fermer" onclick="fermerPrecommande()">Fermer</button>
                <div id="prixTotal">Total : <span>0 euros</span></div>

                <button type="submit">Payer</button>
            </section>
        </form>

    </div>
</div>
-->

<!-- Fenêtre flottante du panier -->
<?php include 'panier.php'; ?>

</main>

<!-- Footer -->
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

<script src="https://js.stripe.com/v3/"></script>
<script src="https://cdn.emailjs.com/dist/email.min.js"></script>
<script src="../js/app.js"></script>
<script src="../js/panier.js"></script>
<script src="../js/precommande.js"></script>

<script>
    window.addEventListener("scroll", function () {
        var header = document.querySelector("header");
        var h1 = document.querySelector("h1");
        var a = document.querySelector("#entete>a");
        var imgipage = document.querySelector("img");
        var imgipanier = document.querySelector(".panier-link img");
        var nb = document.querySelector(".nombre-articles-panier");
        var panier = document.querySelector(".panier-fenetre");
        var bulle = document.querySelector(".panier-bulle");

        if (window.scrollY > 50) {
            header.classList.add("shrink");
            h1.classList.add("shrink");
            a.classList.add("shrink");
            imgipage.classList.add("shrink");
            imgipanier.classList.add("shrink");
            nb.classList.add("shrink");
            panier.classList.add("shrink");
            if (bulle !== null) {
                bulle.classList.add("shrink");
            }
        } else {
            header.classList.remove("shrink");
            h1.classList.remove("shrink");
            a.classList.remove("shrink");
            imgipage.classList.remove("shrink");
            imgipanier.classList.remove("shrink");
            nb.classList.remove("shrink");
            panier.classList.remove("shrink");
            if (bulle !== null) {
                bulle.classList.remove("shrink");
            }
        }
    });
</script>
<script>
    var carousel = document.getElementById('carousel');
    var scrollAmount = 0;
    var scrollTime = 10000; // Temps de défilement en millisecondes

    function rotateImages() {
        scrollAmount++;
        if (scrollAmount >= carousel.childElementCount) {
            scrollAmount = 0;
        }
        carousel.scrollTo({
            top: 0,
            left: scrollAmount * carousel.offsetWidth,
            behavior: 'smooth'
        });
    }

    function prevImage() {
        scrollAmount--;
        if (scrollAmount < 0) {
            scrollAmount = carousel.childElementCount - 1;
        }
        carousel.scrollTo({
            top: 0,
            left: scrollAmount * carousel.offsetWidth,
            behavior: 'smooth'
        });
    }

    function nextImage() {
        scrollAmount++;
        if (scrollAmount >= carousel.childElementCount) {
            scrollAmount = 0;
        }
        carousel.scrollTo({
            top: 0,
            left: scrollAmount * carousel.offsetWidth,
            behavior: 'smooth'
        });
    }

    setInterval(rotateImages, scrollTime);
</script>



<script>
    // Attendre que le contenu de la page soit chargé
    document.addEventListener("DOMContentLoaded", function () {
        // Sélectionner la div à supprimer en utilisant un sélecteur CSS
        var divASupprimer = document.querySelector('div[style="text-align: right;position: fixed;z-index:9999999;bottom: 0;width: auto;right: 1%;cursor: pointer;line-height: 0;display:block !important;"]');

        // Vérifier si la div existe
        if (divASupprimer) {
            // Supprimer la div
            divASupprimer.parentNode.removeChild(divASupprimer);
        } else {
            console.log("La div spécifiée n'existe pas.");
        }
    });
</script>
</body>

</php>