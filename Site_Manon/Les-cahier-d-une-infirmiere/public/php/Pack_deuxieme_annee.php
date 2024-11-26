<?php include 'header.php'; ?>
<link rel="stylesheet" href="../css/article.css">
<title>Pack deuxième année</title>

<main>
    <article>
        <div id="carousel" class="carousel">
            <img src="../Images/Pack_deuxieme_annee.png" alt="Image 1">
            <img src="../Images/Pack_deuxieme_annee1.png" alt="Image 2">
            <img src="../Images/Pack_deuxieme_annee2.png" alt="Image 3">
            <img src="../Images/Pack_deuxieme_annee3.png" alt="Image 4">
        </div>
        <button class="prev" onclick="prevImage()">&#10094;</button>
        <button class="next" onclick="nextImage()">&#10095;</button>
    </article>

    <article>
        <section>
            <h2>Pack Deuxième Année</h2>
            <p>Description : <br>Ce pack regroupe les cours de la deuxième année, il te servira durant toutes t'as
                formation. <br>Avec ce pack
                tu as toutes les cartes en mains pour réussir t'as formation. <br> Une fois diplômée elles te
                serviront toujours.</p>
            <p>Ce pack regroupe :</p>
            <ul>
                <li><a href="../php/Processus_obstructif.php">Processus obstructif</a></li>
                <li><a href="../php/Processus_infectieux.php">Processus infectieux</a></li>
                <li><a href="../php/Processus_degeneratif.php">Processus dégénératif</a></li>
            </ul>
            <p class="prix">Prix :</p>
            <ul>
                <li>A6 : 99 €</li>
                <li>A5 : 130 €</li>
                <li>Plastifié : +10%</li>
            </ul>
            <section>
                <a href="index.php" class="class-btn-retour"><button class="btn-retour">Voir d'autres
                        articles</button></a>
                <button class="btn-ajouter-article" onclick="ajouterAuPanier('Pack Deuxième Année', 'A5', 'Non')">Ajouter au
                    panier</button>
            </section>
        </section>
    </article>
</main>
<script src="../js/carroussel.js"></script>
<?php include 'footer.php'; ?>