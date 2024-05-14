<?php include 'header.php'; ?>
<link rel="stylesheet" href="../css/article.css">
<title>Pack Semestre 1</title>

<main>
    <article>
        <div id="carousel" class="carousel">
            <img src="../Images/Pack_semestre1.png" alt="Image 1">
            <img src="../Images/Pack_semestre1 (2).png" alt="Image 2">
            <img src="../Images/Pack_semestre1 (3).png" alt="Image 3">
            <img src="../Images/Pack_semestre1 (4).png" alt="Image 4">
            <img src="../Images/Pack_semestre1 (5).png" alt="Image 5">
        </div>
        <button class="prev" onclick="prevImage()">&#10094;</button>
        <button class="next" onclick="nextImage()">&#10095;</button>
    </article>

    <article>
        <section>
            <h2>Pack Semestre 1
            </h2>
            <p>Description : <br>Ce pack regroupe les cours du semestre 1 de la x année, il te servira durant toutes
                t'as formation.
                <br>Avec ce pack
                tu as toutes les cartes en mains pour réussir t'as formation. <br> Une fois diplômée elles te
                serviront toujours.
            </p>
            <p>Ce pack regroupe :</p>
            <ul>
                <li><a href="../php/Soins_infirmier.php">Soins infirmier</a></li>
                <li><a href="../php/Cycle_de_la_vie_et_de_la_grande_fonction.php">Cycle de la vie et de la grande fonction</a></li>
                <li><a href="../php/Biologie_fondamental.php">Biologie fondamental</a></li>
                <li><a href="../php/Processus_traumatique.php">Processus traumatique</a></li>
            </ul>
            <p class="prix">Prix :</p>
            <ul>
                <li>A6 : 69 €</li>
                <li>A5 : 92 €</li>
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