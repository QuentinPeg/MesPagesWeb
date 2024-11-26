<?php include 'header.php'; ?>
<link rel="stylesheet" href="../css/article.css">
<title>Soins Infirmier</title>

<main>
    <article>
        <div id="carousel" class="carousel">
            <!-- EN FONCTION DU NOMBRE D'IMAGE AJOUTER AUTANT DE BALISE QUE NECESSAIRE AVEC BON LIEN D'IMAGE-->
            <!--<img src="../Images/image_aticle.png" alt="Image 1">-->
        </div>
        <button class="prev" onclick="prevImage()">&#10094;</button>
        <button class="next" onclick="nextImage()">&#10095;</button>
    </article>

    <article>
        <section>
            <h2><!--Titre article--></h2>
            <p>Description : <br>
                <!--Description-->
            </p>
            <p>Contien :</p>
            <ul>
                <li>xxxx</li>
                <li>xxxx</li>
            </ul>
            <input type="checkbox" id="lireSuite1" class="lire-suite-checkbox">
            <label for="lireSuite1" class="lire-suite-label">
                <span class="label-text"></span>
            </label>
            <ul class="suite">
                <li>si trop long</li>
            </ul>
            <p class="prix">Prix :</p>
            <ul>
                <li>xx €</li>
                <li>Option ?</li>
            </ul>
            <section>
                <a href="index.php" class="class-btn-retour"><button class="btn-retour">Voir d'autres
                        articles</button></a>
                <button class="btn-ajouter-article" onclick="ajouterAuPanier('/*nom_article*/', '/*option*/')">Ajouter
                    au panier</button>
            </section>
        </section>
    </article>
</main>
<script src="../js/carroussel.js"></script>
<?php include 'footer.php'; ?>