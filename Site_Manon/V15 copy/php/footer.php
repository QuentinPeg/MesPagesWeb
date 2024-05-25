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
    <p>Une petite note sur moi : ...</p>
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
    </div>
</footer>
<script src="../js/precommande.js"></script>
</body>

</html>