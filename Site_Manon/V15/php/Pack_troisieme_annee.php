<?php include 'header.php'; ?>
<link rel="stylesheet" href="../css/article.css">
<title>Pack Troisième Année</title>

<main>
    <article>
        <div id="carousel" class="carousel">
            <img src="../Images/Pack_troisieme_annee.png" alt="Image 1">
            <img src="../Images/Pack_troisieme_annee1.png" alt="Image 2">
            <img src="../Images/Pack_troisieme_annee2.png" alt="Image 3">
        </div>
        <button class="prev" onclick="prevImage()">&#10094;</button>
        <button class="next" onclick="nextImage()">&#10095;</button>
    </article>

    <article>
        <section>
            <h2>Pack Troisième Année </h2>
            <p>Description : <br>Ce pack regroupe les cours la 3ème année, il te servira durant toutes t'as
                formation. <br>Avec ce pack
                tu as toutes les cartes en mains pour réussir t'as formation. <br> Une fois diplômée elles te
                serviront toujours.</p>
            <p>Ce pack regroupe :</p>
            <ul>
                <li><a href="../php/Processus_psychopathologique_S5.php">Processus psychopathologiques semestre 5</a></li>
                <li><a href="../php/Processus_tumoraux.php">Processus tumoraux</a></li>
            </ul>
            <p class="prix">Prix :</p>
            <ul>
                <li>A6 : 69 €</li>
                <li>A5 : 96 €</li>
                <li>Plastifié : +10%</li>
            </ul>
            <section>
                <a href="index.php"><button class="btn-retour">Voir d'autres
                        articles</button></a>
                <!--<button class="btn-precommander" onclick="afficherPrecommande()">Précommander</button>-->
            </section>
        </section>
    </article>
</main>
<?php include 'footer.php'; ?>