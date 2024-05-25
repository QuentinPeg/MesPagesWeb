<?php
session_start();
include 'panier.php';

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['product_title']) && isset($_POST['quantity'])) {
    $product_title = $_POST['product_title'];
    $quantity = $_POST['quantity'];
    addToCart($product_title, $quantity);
    // Répondre avec une confirmation que l'article a été ajouté
    echo json_encode(['success' => true]);
    exit;
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <title>Les cahiers d'une infirmière</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="../js/ajoutarticle.js"></script>
    <link rel="stylesheet" href="../css/styles.css">
    <script src="https://js.stripe.com/v3/"></script>
    <script src="https://cdn.emailjs.com/dist/email.min.js"></script>
    <script src="../js/app.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">
</head>
<body>
    <header>
        <a href="../php/index.php"><img class="ipage" src="../Images/Logolescahiersduneinfirmiere.jpg" alt="Icon-page"></a>
        <div id="vide"></div>
        <h1>Les cahiers d'une infirmière</h1>
        <div id="entete">
            <a href="Contact.php">CONTACT</a>
        </div>
        <a onclick="showCart()">
            <span class="panier-link">
                <img src="../Images/panier.svg" alt="panier">
                <span class="nombre-articles-panier" id="panier-bulle">0</span>
            </span>
        </a>
    </header>

    <main>
        <p>Tu es étudiant ou diplômé et tu as besoin d'une piqure de rappel, ce site est fait pour toi !</p>

        <h2 class="titre_partie">Les packs</h2>
        <section id="packs"></section>

        <h2 class="titre_partie">Les spécifications</h2>
        <section id="nonpacks"></section>

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
            <a href="../php/conditions&mentions.php"><p>Coder par Peguin Quentin</p></a>
            <a href="../php/conditions&mentions.php"><p>&copy; Tout droit d'auteur réservé</p></a>
            <a href="../php/conditions&mentions.php"><p>Conditions d'utilisation & Mentions légales</p></a>
        </div>
    </footer>
    <script src="../js/precommande.js"></script>
</body>
</html>
