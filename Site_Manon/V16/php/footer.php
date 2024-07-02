<div class="panier-fenetre" id="panier-fenetre" style="display: none;">
    <div class="panier">
        <h2>Votre Panier</h2>
        <ul id="panier-liste"></ul>
        <div class="boutons-panier">
            <button class="btn-supprimer-tout" onclick="clearCart()">Supprimer tout le panier</button>
            <button class="btn-precommander" onclick="afficherPrecommande()">Précommander</button>
        </div>
    </div>
</div>

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
            <div id="card-number-element"></div>
            <div id="card-expiry-element"></div>
            <div id="card-cvc-element"></div>
            <div id="card-errors" role="alert"></div>
            <section id="section-bouton">
                <button type="button" class="btn-fermer" onclick="fermerPrecommande()">Fermer</button>
                <div id="prixTotal">Total : <span>0 euros</span></div>
                <button type="submit">Payer</button>
            </section>
        </form>
    </div>
</div>
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

<script src="https://js.stripe.com/v3/"></script>
<script src="../js/app.js"></script>

</body>

</html>