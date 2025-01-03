<!-- Fenêtre flottante du panier -->
<div class="panier-fenetre" id="panier-fenetre" style="display: none;">
    <div class="panier">
        <h2>Votre Panier</h2>
        <ul id="panier-liste">
        </ul>
        <div class="boutons-panier">
            <button class="btn-supprimer-tout" onclick="supprimerToutPanier()">Supprimer tout le panier</button>
            <button class="btn-precommander" onclick="afficherPrecommande()">Précommander</button>
        </div>
    </div>
</div>

<!--Fenêtre flottante de précommande-->
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
                    <label for="civilite">Civilité :</label>
                    <select id="civilite" name="civilite" required>
                        <option value="homme">Homme</option>
                        <option value="femme">Femme</option>
                    </select>
                </div>
                <div class="grp">
                    <label for="Email">Email :</label>
                    <input type="email" id="Email" name="Email" placeholder="Email*" required>
                </div>
            </section>
            <section>
                <div class="grp">
                    <label for="numero">Numéro de téléphone :</label>
                    <input type="tel" id="numero" name="numero" placeholder="Numéro de téléphone*" required>
                </div>
                <div class="grp">
                    <label for="Adresse">Adresse : </label>
                    <input type="text" id="Adresse" name="Adresse" placeholder="Adresse*" required>
                </div>
            </section>
            <section>
                <div class="grp">
                    <label for="CodePostale">Code Postale :</label>
                    <input type="text" id="CodePostale" name="Code_Postale" placeholder="Code Postale*" required>
                </div>
                <div class="grp">
                    <label for="Ville">Ville :</label>
                    <input type="text" id="Ville" name="Ville" placeholder="Ville*" required>
                </div>
            </section>
            <span class="italique">* = Champ obligatoire </span>
            <hr>
            <input type="hidden" id="amount" name="amount" value="0">

            <div id="CarteBleu">
                <span class="italique">Pour toute information sur le fonctionnement du système de paiement utilisé ou
                    pour atténuer vos craintes avant votre achat, n'hésitez pas à nous contacter via la
                    page <a href="contact.php" class="gras"> contact </a> ! (Réponse sous 1 jour)
                </span>
                <div id="card-number-element"></div>
                <div id="CB2">
                    <div id="card-expiry-element"></div>
                    <div id="card-cvc-element"></div>
                </div>
                <div id="card-errors" role="alert"></div>
            </div>
            <section id="section-bouton">
                <button type="button" class="btn-fermer" onclick="fermerPrecommande()">Fermer</button>
                <div id="prixTotal">Total : <span>0 euros</span></div>
                <button type="submit" class="btn-payer">Payer</button>
            </section>
        </form>
    </div>
</div>