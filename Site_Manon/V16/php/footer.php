<!-- Fenêtre flottante du panier -->
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

<script>
    function showCart() {
        var modal = document.getElementById('panier-fenetre');
        modal.style.display = 'block';
        fetch('afficher_panier.php')
            .then(response => response.text())
            .then(data => document.getElementById('panier-liste').innerHTML = data);
    }

    function hideCart() {
        document.getElementById('panier-fenetre').style.display = 'none';
    }

    function updateCart(action, productId) {
        const formData = new FormData();
        formData.append('action', action);
        formData.append('product_title', productId);
        fetch('afficher_panier.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.text())
            .then(data => document.getElementById('panier-liste').innerHTML = data);
    }

    function clearCart() {
        const formData = new FormData();
        formData.append('action', 'clear_cart');
        fetch('afficher_panier.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.text())
            .then(data => document.getElementById('panier-liste').innerHTML = data);
    }
</script>
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
<script src="../js/precommande.js"></script>
</body>

</html>