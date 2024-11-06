<?php include 'header.php'; ?>
<link rel="stylesheet" href="../css/article.css">
<title>Pack première année</title>

<main>
    <article>
        <div id="carousel" class="carousel">
            <img src="../Images/Pack_premiere_annee.png" alt="Image 1">
            <img src="../Images/Pack_premiere_annee2.png" alt="Image 2">
            <img src="../Images/Pack_premiere_annee3.png" alt="Image 3">
            <img src="../Images/Pack_premiere_annee4.png" alt="Image 4">
            <img src="../Images/Pack_premiere_annee5.png" alt="Image 5">
        </div>
        <button class="prev" onclick="prevImage()">&#10094;</button>
        <button class="next" onclick="nextImage()">&#10095;</button>
    </article>

    <article>
        <section>
            <h2>Pack Première Année</h2>
            <p>Description : <br>Ce pack regroupe les cours de la première année, il te servira durant toutes t'as
                formation. <br>Avec ce pack
                tu as toutes les cartes en mains pour réussir t'as formation. <br> Une fois diplômée elles te
                serviront toujours.</p>
            <p>Ce pack regroupe :</p>
            <ul>
                <li><a href="../php/Soins_infirmier.php">Soins infirmier</a></li>
                <li><a href="../php/Cycle_de_la_vie_et_de_la_grande_fonction.php">Cycle de la vie et grande fonction</a>
                </li>
                <li><a href="../php/Biologie_fondamental.php">Biologie fondamental</a></li>
                <li><a href="../php/Processus_traumatique.php">Processus traumatique</a></li>
                <li><a href="../php/Processus_psychopathologique_S2.php">Processus psychopathologiques semestre 2</a>
                </li>
            </ul>
            <p class="prix">Prix :</p>
            <ul>
                <li>A6 : 86 € </li>
                <li>A5 : 117 € </li>
                <li>Plastifié : +10%</li>
            </ul>
            <section>
                <a href="index.php" class="class-btn-retour"><button class="btn-retour">Voir d'autres
                        articles</button></a>
                <button class="btn-ajouter-article" onclick="addToCart('Pack Première Année', 1, 'A5', 'Non')">Ajouter
                    au
                    panier</button>
            </section>
        </section>
    </article>
</main>
<?php include 'footer.php'; ?>