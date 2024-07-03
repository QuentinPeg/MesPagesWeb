<?php include 'header.php'; ?>
<link rel="stylesheet" href="../css/article.css">
<title>Processus tumoraux</title>

<main>
    <article>
        <div id="carousel" class="carousel">
            <img src="../Images/Processus_tumoraux.png" alt="Image 1">
            <img src="../Images/Processus_tumoraux1.png" alt="Image 2">
        </div>
        <button class="prev" onclick="prevImage()">&#10094;</button>
        <button class="next" onclick="nextImage()">&#10095;</button>
    </article>

    <article>
        <section>
            <h2>Processus tumoraux (UE 2.9 semestre 5)
            </h2>
            <p>Description : <br>
                Ce pack correspond à l’unité d’enseignement 2.9. Il permet d’étudier les cancers sur une trame
                (définition, facteurs favorisants, signes cliniques, examens complémentaires, axes thérapeutiques
                et complication). Vous pourrez ainsi vous en servir pour étudier lors de votre formation puis plus
                tard lorsque vous serez confronter aux cancers de certains patients.
            </p>

            <p>Ce pack regroupe :</p>
            <ul>
                <li>Hypertrophie bénigne de la prostate</li>
                <li>Cancer de la prostate</li>
                <li>Cancer de la vessie</li>
                <li>Cancer du rein</li>
                <li>Cancer du testicule</li>
                <li>Cancer du col de l’utérus</li>
                <li>Cancer de l’ovaire</li>
                <li>Cancer de l’endomètre</li>
                <li>Cancer du sein</li>
                <li>Cancer du pancréas</li>
                <li>Cancer du colon</li>
                <li>Tumeur du foie</li>
            </ul>
            <input type="checkbox" id="lireSuite1" class="lire-suite-checkbox">
            <label for="lireSuite1" class="lire-suite-label">
                <span class="label-text"></span>
            </label>
            <ul class="suite">
                <li>Cancer bronchique</li>
                <li>Cancer ORL</li>
                <li>Mélanome</li>
                <li>Tumeurs cérébrales</li>
                <li>Leucémie aiguë myéloïde</li>
                <li>Hémopathie lymphoïde B</li>
                <li>Rappel de la cellule cancéreuse</li>
                <li>Lexique cancérologie</li>
                <li>Les différents marqueurs tumoraux essentiels</li>
                <li>Les soins de support</li>
            </ul>

            <p class="prix">Prix :</p>
            <ul>
                <li>A6 : 35 €</li>
                <li>A5 : 43 €</li>
                <li>Plastifié : +10%</li>
            </ul>
            <section>
                <a href="index.php" class="class-btn-retour"><button class="btn-retour">Voir d'autres
                        articles</button></a>
                <button class="btn-ajouter-article"
                    onclick="addToCart('Processus tumoraux (UE 2.9 semestre 5)', 1, 'A5', 'Non')">Ajouter au
                    panier</button>
            </section>
        </section>
    </article>
</main>
<?php include 'footer.php'; ?>