<?php include 'header.php'; ?>
<link rel="stylesheet" href="../css/article.css">
<title>Processus traumatique</title>

<main>
    <article>
        <div id="carousel" class="carousel">
            <img src="../Images/Processus_trauma.png" alt="Image 1">
            <img src="../Images/Processus_trauma1.png" alt="Image 2">
        </div>
        <button class="prev" onclick="prevImage()">&#10094;</button>
        <button class="next" onclick="nextImage()">&#10095;</button>
    </article>

    <article>
        <section>
            <h2>Processus traumatique (UE 2.4 semestre 1)</h2>
            <p>Description : <br>
                Ce pack correspond à l’unité d’enseignement 2.4. Avec celui ci vous deviendrez incollable sur les
                fracture, entorse et traumatisme de l’organisme. Sur une trame (définition, facteurs favorisants,
                signes cliniques, examens complémentaires, axes thérapeutiques et complications), vous pourrez
                balayer l’ensemble des traumatisme que le corps humain peut subir de manière synthétique. Une
                fois professionnel vous pourrez vous en servir pour vous rafraîchir la mémoire, lorsqu’un patient
                se présentera à vous avec l’une de ses pathologies.
            </p>

            <p>Ce pack regroupe :</p>
            <ul>
                <li>Fracture du fémur</li>
                <li>Luxation de la hanche</li>
                <li>Fracture de la jambe</li>
                <li>Fracture de la rotule</li>
                <li>Lésion ligamentaire du genou</li>
                <li>Entorse de la cheville</li>
                <li>Entorse des doigts</li>
                <li>Traumatisme de la main</li>
                <li>Entorse du poignet</li>
                <li>Fracture de l’humérus</li>
            </ul>
            <input type="checkbox" id="lireSuite1" class="lire-suite-checkbox">
            <label for="lireSuite1" class="lire-suite-label">
                <span class="label-text"></span>
            </label>
            <ul class="suite">
                <li>Fracture du poignet</li>
                <li>Fracture de la clavicule</li>
                <li>Luxation de l’épaule</li>
                <li>Traumatisme du coude</li>
                <li>Traumatisme abdominal</li>
                <li>Traumatisme thoracique</li>
                <li>Traumatisme crânien</li>
                <li>Traumatisme rachidien</li>
            </ul>

            <p class="prix">Prix :</p>
            <ul>
                <li>A6 : 23 €</li>
                <li>A5 : 31 €</li>
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