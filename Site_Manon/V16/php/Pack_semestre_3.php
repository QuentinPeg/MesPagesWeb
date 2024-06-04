<?php include 'header.php'; ?>
<link rel="stylesheet" href="../css/article.css">
<title>Pack Semestre 3</title>

<main>
    <article>
        <div id="carousel" class="carousel">
            <img src="../Images/Pack_semestre3.png" alt="Image 1">
            <img src="../Images/Pack_semestre3 (2).png" alt="Image 2">
            <img src="../Images/Pack_semestre3 (3).png" alt="Image 3">
        </div>
        <button class="prev" onclick="prevImage()">&#10094;</button>
        <button class="next" onclick="nextImage()">&#10095;</button>
    </article>

    <article>
        <section>
            <h2>Pack Semestre 3</h2>
            <p>Description : <br>Ce pack regroupe les cours du semestre 3 de la xème année, il te servira durant
                toutes t'as formation. <br>Avec ce pack
                tu as toutes les cartes en mains pour réussir t'as formation. <br> Une fois diplômée elles te
                serviront toujours.</p>
            <p>Ce pack regroupe :</p>
            <ul>
                <li><a href="../php/Processus_obstructif.php">Processus obstructif</a></li>
                <li><a href="../php/Processus_infectieux.php">Processus infectieux</a></li>
            </ul>
            <p class="prix">Prix :</p>
            <ul>
                <li>A6 : 71 €</li>
                <li>A5 : 86 €</li>
                <li>Plastifié : +10%</li>
            </ul>
            <section>
                <a href="index.php"><button class="btn-retour">Voir d'autres
                        articles</button></a>
                <button class="btn-ajouter-article" onclick="addToCart('Pack Semestre 3', 1)">Ajouter au
                    panier</button>
            </section>
        </section>
    </article>
</main>
<?php include 'footer.php'; ?>